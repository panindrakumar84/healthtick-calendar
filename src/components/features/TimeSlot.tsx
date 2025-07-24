// /src/components/features/TimeSlot.tsx

import { Plus } from 'lucide-react';
import type { Booking } from '../../types/booking';
import { CallCard } from './CallCard';

interface TimeSlotProps {
  time: string;
  booking?: Booking;
  isSpanned?: boolean;
  onBook: (time: string) => void;
  onDelete: (booking: Booking) => void;
  isDisabled?: boolean;
}

export function TimeSlot({ time, booking, isSpanned, onBook, onDelete, isDisabled }: TimeSlotProps) {
  // If this slot is covered by a 40-min call from the previous slot, render nothing.
  if (isSpanned) {
    return null;
  }

  const isLongBooking = booking?.durationMins === 40;

  return (
    <div className="flex items-stretch border-t border border-border rounded-lg last:border-b m-2  ">
      {/* Time Label Column */}
       <div className={`w-28 flex-shrink-0 px-2 flex items-center justify-center ${isDisabled ? 'opacity-50' : ''}`}>
        <span className="font-medium text-primary text-md font-poppins">{time}</span>
      </div>

      {/* Slot Content Column */}
       <div className={`flex-grow border-l border-border p-2  ${isDisabled ? '' : ''}`}>
        {booking ? (
          <CallCard
            booking={booking}
            isLong={isLongBooking}
            onDelete={() => onDelete(booking)}
          />
        ) : (
           <button
            onClick={() => onBook(time)}
            disabled={isDisabled}
            className="w-full h-full min-h-[60px] flex items-center justify-center text-text-secondary hover:bg-surface transition-colors rounded-md group disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            {isDisabled ? (
              <span className="text-sm font-medium text-muted-text font-poppins">Past Time</span>
            ) : (
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 transition-transform group-hover:scale-110 text-primary" />
                <span className="text-sm font-medium font-poppins text-muted-text">Click to Book</span>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
