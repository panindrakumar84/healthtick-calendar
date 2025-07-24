import  { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Client } from '../types/client';
import { useClients } from '../hooks/useClients';

interface ClientsContextType {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export function ClientsProvider({ children }: { children: ReactNode }) {
  const { clients, loading, error } = useClients();

  return (
    <ClientsContext.Provider value={{ clients, loading, error }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClientsContext() {
  const context = useContext(ClientsContext);
  if (context === undefined) {
    throw new Error('useClientsContext must be used within a ClientsProvider');
  }
  return context;
}
