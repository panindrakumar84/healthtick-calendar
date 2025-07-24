import  { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Booking } from '../types/booking';
import { useBookings } from '../hooks/useBookings';
import { useCalendarContext } from './CalendarContext';

interface BookingsContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  refetchBookings: () => void;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export function BookingsProvider({ children }: { children: ReactNode }) {
  const { selectedDate } = useCalendarContext();
  const bookingsState = useBookings(selectedDate);

  return (
    <BookingsContext.Provider value={bookingsState}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookingsContext() {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookingsContext must be used within a BookingsProvider');
  }
  return context;
}
