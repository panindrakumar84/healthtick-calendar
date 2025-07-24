import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { X, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

import type { Client } from '../../types/client';
import type { Booking } from '../../types/booking';
import { createBooking } from '../../services/bookingService';
import { getDayOfWeek } from '../../utils/dateHelpers';
import { useBookingsContext } from '../../contexts/BookingsContext';
import { Card } from '../atomic/Card';
import { Button } from '../atomic/Button';
import { ClientSelect } from './ClientSelect';
import { ErrorBanner } from '../ErrorBanner';
import { useCalendarContext } from '../../contexts/CalendarContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string;
}

export function BookingModal({ isOpen, onClose, selectedTime }: BookingModalProps) {
  const { refetchBookings } = useBookingsContext();
  const { selectedDate } = useCalendarContext();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [callType, setCallType] = useState<'onboarding' | 'followup'>('onboarding');
  const [isRecurring, setIsRecurring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset form state when modal is opened or date changes
    if (isOpen) {
      setSelectedClient(null);
      setCallType('onboarding');
      setIsRecurring(false);
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedClient) {
      setError('A client must be selected to book a call.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const bookingData: Omit<Booking, 'id'> = {
      clientId: selectedClient.id,
      startTime: selectedTime,
      durationMins: callType === 'onboarding' ? 40 : 20,
      type: callType,
      isRecurring: callType === 'followup' && isRecurring,
      ...(callType === 'onboarding' && { date: selectedDate }),
      ...(callType === 'followup' && isRecurring && {
        startDate: selectedDate,
        recurrence: {
          freq: 'WEEKLY',
          day: getDayOfWeek(selectedDate),
        }
      })
    };

 const promise = createBooking(bookingData, selectedDate);
    toast.promise(promise, {
      loading: 'Creating your booking...',
      success: (result) => {
        if (result.success) {
          refetchBookings();
          onClose();
          return 'Booking created successfully!';
        } else {
          throw new Error(result.error);
        }
      },
      error: (err) => err.message || 'An unknown error occurred.',
    });

    promise.finally(() => setIsSubmitting(false));
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg" padding="lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-raleway text-primary">Book a Call</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X />
          </Button>
        </div>

        <div className="flex items-center gap-6 mb-6 text-muted-text font-poppins">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{format(new Date(selectedDate), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>{selectedTime}</span>
          </div>
        </div>

        {error && <ErrorBanner message={error} className="mb-4" onDismiss={() => setError(null)} />}

        <div className="space-y-6 font-poppins">
          <div>
            <label className="block text-sm font-medium mb-2 text-primary">Client</label>
            <ClientSelect selectedClient={selectedClient} onSelect={setSelectedClient} disabled={isSubmitting} />
          </div>

          <div>
            <label className="block text-sm font-medium  text-primary mb-2">Call Type</label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant={callType === 'onboarding' ? 'primary' : 'secondary'} onClick={() => setCallType('onboarding')}>
                Onboarding (40 min)
              </Button>
              <Button variant={callType === 'followup' ? 'primary' : 'secondary'} onClick={() => setCallType('followup')}>
                Follow-up (20 min)
              </Button>
            </div>
          </div>

          {callType === 'followup' && (
            <label className="flex items-center gap-3 bg-secondary p-3 rounded-lg text-muted-text">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5"
              />
              <span>Make this a recurring weekly call</span>
            </label>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={!selectedClient}
          >
            Confirm Booking
          </Button>
        </div>
      </Card>
    </div>
  );
}
