import React from 'react';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';
import type { Booking } from '../../types/booking';
import { deleteBooking } from '../../services/bookingService';
import { useBookingsContext } from '../../contexts/BookingsContext';
import { Card } from '../atomic/Card';
import { Button } from '../atomic/Button';
import { useClientsContext } from '../../contexts/ClientsContext';

interface DeleteCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export function DeleteCallModal({ isOpen, onClose, booking }: DeleteCallModalProps) {
  const { refetchBookings } = useBookingsContext();
  const { clients } = useClientsContext();
  const [isDeleting, setIsDeleting] = React.useState(false);

  if (!isOpen || !booking) return null;

  const client = clients.find(c => c.id === booking.clientId);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    const promise = deleteBooking(booking.id!);

    toast.promise(promise, {
      loading: 'Cancelling booking...',
      success: () => {
        refetchBookings();
        onClose();
        return 'Booking cancelled successfully!';
      },
      error: 'Failed to cancel booking.',
    });

    promise.finally(() => setIsDeleting(false));
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md text-center" padding="lg">
        <div className="mx-auto bg-error/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        <h2 className="text-xl font-semibold font-raleway mb-2 text-primary">Cancel Booking?</h2>
        <p className="text-slate-gray mb-4 text-muted-text font-poppins">
          Are you sure you want to cancel the {booking.type} call with <span className="font-semibold text-text">{client?.name}</span>?
        </p>
        {booking.isRecurring && (
            <p className="bg-error/10 text-error p-3 rounded-lg text-sm mb-6 font-poppins">
                This is a recurring appointment. Deleting it will cancel all future occurrences.
            </p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Keep Booking
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete} isLoading={isDeleting}>
            Yes, Cancel It
          </Button>
        </div>
      </Card>
    </div>
  );
}
