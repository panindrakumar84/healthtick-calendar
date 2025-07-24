// /utils/overlapCheck.ts

import type { Booking } from '../types/booking';
import { timeToSlotIndex } from './dateHelpers';

/**
 * Checks if a proposed booking's slot(s) would overlap with any existing bookings.
 * @param newBooking The proposed booking (must include date, startTime, durationMins)
 * @param existingBookings Array of existing bookings for the same day
 */
export function isSlotOverlapping(newBooking: Pick<Booking, 'date' | 'startTime' | 'durationMins'>, existingBookings: Booking[]): boolean {
  // Convert new booking to slot indices
  const newStartSlot = timeToSlotIndex(newBooking.startTime);
  const newSlots = newBooking.durationMins / 20; // Number of slots needed
  const newSlotIndices = Array.from({ length: newSlots }, (_, i) => newStartSlot + i);

  // Check for overlap with each existing booking
  for (const booking of existingBookings) {
    const existingStartSlot = timeToSlotIndex(booking.startTime);
    const existingSlots = booking.durationMins / 20;
    const existingSlotIndices = Array.from({ length: existingSlots }, (_, i) => existingStartSlot + i);

    // If any slot overlaps, return true
    if (newSlotIndices.some(slot => existingSlotIndices.includes(slot))) {
      return true;
    }
  }

  return false;
}
