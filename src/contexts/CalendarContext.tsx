import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useCalendar } from '../hooks/useCalendar';

interface CalendarContextType {
  selectedDate: string;
  goToDate: (date: string) => void;
  goToToday: () => void;
  goToNextDay: () => void;
  goToPreviousDay: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const calendarState = useCalendar();

  return (
    <CalendarContext.Provider value={calendarState}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}
