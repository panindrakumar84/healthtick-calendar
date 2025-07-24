import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

import { useCalendarContext } from '../../contexts/CalendarContext';
import { Button } from '../atomic/Button';
import { Card } from '../atomic/Card';

export function DateNavigator() {
  const {
    selectedDate,
    goToDate,
    goToToday,
    goToNextDay,
    goToPreviousDay,
  } = useCalendarContext();

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const selectedDateObj = new Date(selectedDate.replace(/-/g, '/'));

  useEffect(() => {
  // Close picker on click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setIsPickerOpen(false);
    }
};
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
  document.removeEventListener('mousedown', handleClickOutside);
  };
  }, []);

  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      goToDate(format(date, 'yyyy-MM-dd'));
      setIsPickerOpen(false);
    }
  };


  const pickerStyles = `
    .rdp {
      --rdp-cell-size: 40px;
      --rdp-caption-font-size: 1rem;
      --rdp-accent-color: transparent;
      --rdp-background-color: transparent;
      --rdp-accent-color-dark: var(--primary-);
      --rdp-background-color-dark: var(--surface-color);
      --rdp-outline: 2px solid var(--primary-color);
      --rdp-outline-selected: 2px solid var(--primary-color);
      --rdp-color: var(--text-color);
      --rdp-font-family: 'poppins', sans-serif;
    }
    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: #333;
    }
    .rdp-chevron {
    fill: #FAFAFA !important;
    }

    .rdp-day_today {
    color: white !important;
    font-weight: bold;
  }
  `;

  return (
    <Card className="flex items-center justify-between" padding="md">
      <style>{pickerStyles}</style>
      {/* Previous Day Button */}
      <Button variant="secondary" size="icon" onClick={goToPreviousDay}>
        <ChevronLeft className="w-5 h-5 text-primary" />
      </Button>

      {/* Date Display and Picker */}
      <div className="text-center">
        <h2 className="font-raleway text-xl md:text-2xl text-primary font-bold">
          {format(selectedDateObj, 'MMMM d, yyyy')}
        </h2>
        <p className="text-muted-text font-poppins">{format(selectedDateObj, 'eeee')}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={goToToday}>
          Today
        </Button>

        <div className="relative" ref={pickerRef}>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsPickerOpen(!isPickerOpen)}
          >
            <CalendarIcon className="w-5 h-5" />
          </Button>
          {isPickerOpen && (
            <Card className="absolute border-border top-full right-0 mt-2 text-primary z-10" padding="sm">
              <DayPicker
                mode="single"
                selected={selectedDateObj}
                onSelect={handleDaySelect}

              />
            </Card>
          )}
        </div>
      </div>

      {/* Next Day Button */}
      <Button variant="secondary" size="icon" onClick={goToNextDay}>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </Card>
  );
}
