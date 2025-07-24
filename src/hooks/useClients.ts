// /src/hooks/useClients.ts

import { useState, useEffect } from 'react';
import type { Client } from '../types/client';
import { getClients } from '../services/clientService';
import { toast } from 'sonner';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        const clientsData = await getClients();
        setClients(clientsData);
      } catch (err) {
        const errorMessage = 'Failed to load client data.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);
  return { clients, loading, error };
}
