import {
  addDocTyped,
  deleteDocTyped,
  queryDocsTyped,
  updateDocTyped,
} from "./firestore";
import type { Booking } from "../types/booking";
import { getDayOfWeek } from "../utils/dateHelpers";
import { isSlotOverlapping } from "../utils/overlapCheck";
import { validateBooking } from "../utils/validation";
import { getClients } from "./clientService";

const COLLECTION_NAME = "bookings";

// Type for function results (success/error handling)
type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function fetchBookingsForDay(
  date: string // The date we are viewing
): Promise<ServiceResult<Booking[]>> {
  try {
    const dayOfWeek = getDayOfWeek(date);

    // Fetch ONLY one-time bookings for the specific date.
    const oneTimeBookings = await queryDocsTyped<Booking>(COLLECTION_NAME,
      ["date", "==", date],
      ["isRecurring", "==", false],
    );

    // Fetch all recurring bookings for that day of the week.
    const recurringBookings = await queryDocsTyped<Booking>(COLLECTION_NAME,
      ["isRecurring", "==", true],
      ["recurrence.day", "==", dayOfWeek],
    );

    // Filter recurring bookings in memory based on their start date.
    const viewingDate = new Date(date);
    viewingDate.setHours(0, 0, 0, 0);

    const relevantRecurring = recurringBookings.filter((booking) => {
      if (!booking.startDate) return true;

      const bookingStartDate = new Date(booking.startDate);
      bookingStartDate.setHours(0, 0, 0, 0);

      return viewingDate >= bookingStartDate;
    });

    // Combine and return.
    const allBookings = [...oneTimeBookings, ...relevantRecurring].sort(
      (a, b) => a.startTime.localeCompare(b.startTime)
    );

    return { success: true, data: allBookings };
  } catch (error) {
    console.error("Error fetching bookings for day:", error);
    return { success: false, error: "Failed to fetch bookings." };
  }
}



async function isSlotAvailable(
  date: string,
  startTime: string,
  durationMins: number
): Promise<ServiceResult<boolean>> {
  try {
    const result = await fetchBookingsForDay(date);
    if (!result.success) {
      return { success: false, error: result.error };
    }
    const isOverlap = isSlotOverlapping({ startTime, durationMins }, result.data);
    return { success: true, data: !isOverlap };
  } catch (error) {
    return { success: false, error: "Failed to check slot availability" };
  }
}

export async function createBooking(
  booking: Omit<Booking, "id">,
  checkDate: string
): Promise<ServiceResult<string>> {
  try {
    //  Time Validation
    const now = new Date();
    const [hours, minutes] = booking.startTime.split(':').map(Number);
    const bookingDateTime = new Date(checkDate);
    bookingDateTime.setHours(hours, minutes, 0, 0);

    if (bookingDateTime < now) {
      return { success: false, error: "Cannot create a booking in the past." };
    }

    // Input and Client Validation
    const clients = await getClients();
    const clientIds = clients.map((c) => c.id);
    const validationErrors = validateBooking(booking, clientIds);
    if (validationErrors.length > 0) {
      return { success: false, error: validationErrors.join(", ") };
    }

    // Slot Availability Check (using helper)
    const slotResult = await isSlotAvailable(
      checkDate,
      booking.startTime,
      booking.durationMins
    );
    if (!slotResult.success) {
      return { success: false, error: slotResult.error };
    }
    if (!slotResult.data) {
      return { success: false, error: "Slot is already booked or unavailable" };
    }

    const bookingToSave = { ...booking };

    if (bookingToSave.isRecurring) {
      delete bookingToSave.date;
    }

    // Insert into Firestore
    const id = await addDocTyped<Booking>(COLLECTION_NAME, bookingToSave);
    return { success: true, data: id };

  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: "An unexpected error occurred while creating the booking." };
  }
}


export async function deleteBooking(id: string): Promise<ServiceResult<void>> {
  try {
    await deleteDocTyped(COLLECTION_NAME, id);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: "Failed to delete booking" };
  }
}


export async function updateBooking(
  id: string,
  updates: Partial<Booking>
): Promise<ServiceResult<void>> {
  try {
    await updateDocTyped<Booking>(COLLECTION_NAME, id, updates);
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: "Failed to update booking" };
  }
}
