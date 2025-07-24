import { useState, useMemo } from 'react';
import { useBookingsContext } from '../../contexts/BookingsContext';
import { getAllSlotLabels } from '../../utils/dateHelpers';
import type { Booking } from '../../types/booking';

import { DateNavigator } from '../features/DateNavigator';
import { TimeSlot } from '../features/TimeSlot';
import { BookingModal } from '../features/BookingModal';
import { DeleteCallModal } from '../features/DeleteCallModal';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorBanner } from '../ErrorBanner';
import { useCalendarContext } from '../../contexts/CalendarContext';

export function CalendarDayView() {
  const { bookings, loading, error, refetchBookings } = useBookingsContext();
  const {selectedDate} = useCalendarContext();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);

  const timeSlots = useMemo(() => getAllSlotLabels(), []);

  const handleOpenBookingModal = (time: string) => {
    setSelectedTime(time);
    setIsBookingModalOpen(true);
  };

  const handleOpenDeleteModal = (booking: Booking) => {
    setBookingToDelete(booking);
    setIsDeleteModalOpen(true);
  };

  const isPastTime = (time: string): boolean => {
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate > today) {
      return false;
    }
    if (selectedDate < today) {
      return true;
    }

    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < now;
  };


  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="lg" message="Loading schedule..." />
        </div>
      );
    }

    if (error) {
      return <ErrorBanner message={error} onRetry={refetchBookings} />;
    }

    const spannedSlots = new Set<string>();
    bookings.forEach(booking => {
      if (booking.durationMins === 40) {
        const startIndex = timeSlots.indexOf(booking.startTime);
        if (startIndex !== -1 && startIndex + 1 < timeSlots.length) {
          spannedSlots.add(timeSlots[startIndex + 1]);
        }
      }
    });

    return (
      <div className="flex flex-col  rounded-xl ">
        {timeSlots.map(time => {
          const booking = bookings.find(b => b.startTime === time);
          const isDisabled = isPastTime(time);
          return (
            <TimeSlot
              key={time}
              time={time}
              booking={booking}
              isSpanned={spannedSlots.has(time)}
              onBook={handleOpenBookingModal}
              onDelete={() => booking && handleOpenDeleteModal(booking)}
              isDisabled={isDisabled}
            />
          );
        })}
      </div>
    );
  };

 return (
     <div className="bg-background  p-4 sm:p-6 md:p-8 min-h-screen ">
     <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] bg-surface border border-border max-w-3xl mx-auto rounded-lg shadow-2xl">
      <header className="p-4 md:p-8 flex-shrink-0">
        <h1 className="text-4xl font-bold font-raleway text-primary">HealthTick Schedule</h1>
        <p className="text-text-secondary mt-2 text-muted-text font-poppins">
          Your daily overview of coaching calls and appointments.
        </p>
      </header>

      <div className="mb-4 px-2 flex-shrink-0 ">
        <DateNavigator />
      </div>

      <main className="flex-1 overflow-hidden">
        <div     className="
      h-full overflow-y-auto custom-scrollbar
    ">
          {renderContent()}
        </div>
      </main>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedTime={selectedTime}
      />

      <DeleteCallModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        booking={bookingToDelete}
      />
    </div>
    </div>

  );

}
