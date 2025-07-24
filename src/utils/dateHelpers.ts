import type { Slot } from "../types/booking";


// Assumes your calendar slots run from 10:30 AM to 7:30 PM in 20-minute intervals
const SLOT_START_HOUR = 10;
const SLOT_START_MINUTE = 30;
const SLOT_DURATION = 20;
const TOTAL_SLOTS = 27; // 10:30–19:30 (9 hours) in 20-minute slots

/**
 * Converts a date string (YYYY-MM-DD) to a weekday abbreviation (e.g., "MON", "TUE").
 */
export function getDayOfWeek(date: string): string {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayIndex = new Date(date).getDay();
  return days[dayIndex];
}

/**
 * Converts a time string (HH:mm) to a slot index (0-based).
 * Example: "11:10" → slot 2
 */
export function timeToSlotIndex(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const startMinutes = SLOT_START_HOUR * 60 + SLOT_START_MINUTE;
  return Math.floor((totalMinutes - startMinutes) / SLOT_DURATION);
}

/**
 * Converts a slot index (0-based) back to a time string (HH:mm).
 * Example: slot 2 → "11:10"
 */
export function slotIndexToTime(slotIndex: number): string {
  const totalMinutes = SLOT_START_HOUR * 60 + SLOT_START_MINUTE + slotIndex * SLOT_DURATION;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Returns all slot time labels for the day (e.g., ["10:30", "10:50", ..., "19:30"]).
 */
export function getAllSlotLabels(): string[] {
  return Array.from({ length: TOTAL_SLOTS }, (_, i) => slotIndexToTime(i));
}


export function generateDaySlots(): Slot[] {
  const slots: Slot[] = [];
  for (let h = 10; h <= 19; h++) {
    for (let m of [30, 50]) {
      if (h === 19 && m === 50) break; // Stop at 19:30
      const time = `${h}:${m.toString().padStart(2, '0')}`;
      slots.push({
        id: `slot-${h}-${m}`,
        time,
        state: 'empty', // Start with all empty, update later
      });
    }
  }
  return slots;
}
