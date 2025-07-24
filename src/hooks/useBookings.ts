import { useState, useEffect, useCallback } from 'react';
import type { Booking } from '../types/booking';
import { fetchBookingsForDay } from '../services/bookingService';

export function useBookings(date: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndSetBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchBookingsForDay(date);

    if (result.success) {
      setBookings(result.data);
    } else {
      setError(result.error);
      setBookings([]);
    }
    setLoading(false);
  }, [date]);

  useEffect(() => {
    fetchAndSetBookings();
  }, [fetchAndSetBookings]);

  return { bookings, loading, error, refetchBookings: fetchAndSetBookings };
}
