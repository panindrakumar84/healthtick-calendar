import { useState, useEffect, useRef } from 'react';
import { User, Search, ChevronDown } from 'lucide-react';
import type { Client } from '../../types/client';
import { useClientsContext } from '../../contexts/ClientsContext';
import { Input } from '../atomic/Input';
import { Card } from '../atomic/Card';
import { LoadingSpinner } from '../LoadingSpinner';

interface ClientSelectProps {
  selectedClient: Client | null;
  onSelect: (client: Client | null) => void;
  disabled?: boolean;
}

export function ClientSelect({ selectedClient, onSelect, disabled }: ClientSelectProps) {
  const { clients, loading } = useClientsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (client: Client) => {
    onSelect(client);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => !disabled && setIsOpen(!isOpen)}>
        <Input
          type="text"
          value={selectedClient ? selectedClient.name : searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={selectedClient ? selectedClient.name : "Search for a client..."}
          iconLeft={<Search className="w-5 h-5 text-muted-text" />}
          iconRight={<ChevronDown className={`w-5 h-5 transition-transform text-primary ${isOpen ? 'rotate-180' : ''}`} />}
          disabled={disabled}
          readOnly={!!selectedClient}
          className="cursor-pointer"
        />
      </div>

      {selectedClient && (
        <button
          onClick={() => onSelect(null)}
          className="absolute -right-2 -top-2 bg-error rounded-full text-white p-0.5"
        >
            <User className="w-4 h-4" />
        </button>
      )}

      {isOpen && (
        <Card className="absolute top-full w-full mt-2 z-20 max-h-60 overflow-y-auto" padding="sm">
          {loading ? (
            <div className="flex justify-center p-4">
              <LoadingSpinner message="Loading clients..." />
            </div>
          ) : filteredClients.length > 0 ? (
            filteredClients.map(client => (
              <div
                key={client.id}
                onClick={() => handleSelect(client)}
                className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg cursor-pointer"
              >
                <div className="bg-primary/20 p-2 rounded-full">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className='text-primary'>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-slate-gray">{client.phone}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center p-4 text-slate-gray">No clients found.</p>
          )}
        </Card>
      )}
    </div>
  );
}
