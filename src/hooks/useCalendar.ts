
import { useState } from 'react';

export function useCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  const goToDate = (date: string) => {
    setSelectedDate(date);
  };

  const goToToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const goToPreviousDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  return {
    selectedDate,
    goToDate,
    goToToday,
    goToNextDay,
    goToPreviousDay,
  };
}
