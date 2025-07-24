export interface Booking {
    id?: string;
    clientId: string;
    date?: string;
    startTime: string;
    startDate?: string;
    durationMins: number;
    type: "onboarding" | "followup";
    isRecurring: boolean;
    recurrence?: {
        freq: "WEEKLY";
        day: string;
        endDate?: string
    }
}

export interface Slot {
  id: string;
  time: string;
  state: 'empty' | 'booked' | 'disabled';
  content?: React.ReactNode;
}