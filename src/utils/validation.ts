import type { Booking } from '../types/booking';
import { getAllSlotLabels, timeToSlotIndex } from './dateHelpers';

/**
 * Validates a booking object before creation.
 * Returns array of error messages (empty if valid).
 */
export function validateBooking(booking: Omit<Booking, 'id'>, clients: string[]): string[] {
  const errors: string[] = [];

  // Required fields
  if (!booking.clientId) errors.push('Please select a client');
  if (!booking.startTime) errors.push('Start time is required');
  if (!booking.durationMins) errors.push('Duration is required');
  if (!booking.type) errors.push('Call type is required');

  // invalid client
  if (booking.clientId && !clients.includes(booking.clientId)) {
    errors.push('Invalid client ID');
  }

  // Valid duration for call type
  if (booking.type === 'onboarding' && booking.durationMins !== 40) {
    errors.push('Onboarding calls must be 40 minutes');
  }
  if (booking.type === 'followup' && booking.durationMins !== 20) {
    errors.push('Follow-up calls must be 20 minutes');
  }

  // Slot must be within bounds (10:30–7:30, 20-minute slots)
  const slotLabels = getAllSlotLabels();
  const startSlot = timeToSlotIndex(booking.startTime);
  const endSlot = startSlot + (booking.durationMins / 20) - 1;
  if (startSlot < 0 || endSlot >= slotLabels.length) {
    errors.push('Booking time is outside available slot range');
  }

  // For onboarding, ensure next slot exists (no overflow)
  if (booking.type === 'onboarding' && endSlot >= slotLabels.length) {
    errors.push('Onboarding call cannot end outside available slot range');
  }

  return errors;
}
