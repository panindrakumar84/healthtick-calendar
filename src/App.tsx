import { Toaster } from 'sonner';
import { CalendarProvider } from './contexts/CalendarContext';
import { ClientsProvider } from './contexts/ClientsContext';
import { BookingsProvider } from './contexts/BookingsContext';
import { CalendarDayView } from './components/layout/CalendarDayView';

function App() {
  return (
    <ClientsProvider>
      <CalendarProvider>
        <BookingsProvider>
          <main className="min-h-screen bg-background text-text">
            <CalendarDayView/>
          </main>

          <Toaster
            position="bottom-right"
            theme="dark"
            richColors
          />
        </BookingsProvider>
      </CalendarProvider>
    </ClientsProvider>
  );
}

export default App;
