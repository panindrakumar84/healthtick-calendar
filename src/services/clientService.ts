import type { Client } from "../types/client";
import { getDocsTyped } from "./firestore";

const collection_name = 'clients';

export async function getClients(): Promise<Client[]> {
    return await getDocsTyped<Client>(collection_name)
}

export async function searchClients(searchTerm: string): Promise<Client[]> {
  const allClients = await getClients();
  return allClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );
}
