import { Briefcase, Repeat, Trash2 } from 'lucide-react';

import type { Booking } from '../../types/booking';
import { Button } from '../atomic/Button';
import { useClientsContext } from '../../contexts/ClientsContext';

interface CallCardProps {
  booking: Booking;
  isLong: boolean;
  onDelete: () => void;
}

export function CallCard({ booking, isLong, onDelete }: CallCardProps) {
  const { clients } = useClientsContext();
  const client = clients.find((c) => c.id === booking.clientId);

  const isFollowUp = booking.type === 'followup';
  const typeStyles = {
    onboarding: 'bg-blue-900/50 border-blue-700',
    followup: 'bg-green-900/50 border-green-700',
  };

  return (
    // The min-h-[148px] for long calls covers the height of two slots plus spacing
    <div
      className={`
        p-4 rounded-lg border-2 flex flex-col justify-between
        ${typeStyles[booking.type]}
        ${isLong ? 'min-h-[148px]' : 'h-full'}
      `}
    >
      <div>
        <div className="flex justify-between items-start">
          <p className="font-raleway font-medium text-lg text-primary ">
            {client?.name || 'Unknown Client'}
          </p>
          <Button variant="destructive" size="icon" onClick={onDelete} className="h-8 w-8 flex-shrink-0">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <p className="font-poppins text-sm text-muted-text">
          {isFollowUp ? 'Follow-Up Call' : 'Onboarding Call'}
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm mt-4 text-primary font-poppins">
        <div className="flex items-center gap-1.5 ">
          {isFollowUp ? <Repeat className="w-4 h-4" /> : <Briefcase className="w-4 h-4 " />}
          <span>{booking.durationMins} mins</span>
        </div>
        {booking.isRecurring && (
          <span className="font-semibold text-muted-text">
            Every {booking.recurrence?.day}
          </span>
        )}
      </div>
    </div>
  );
}
