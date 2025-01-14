import { Network } from '../types/content';

const API_URL = '/api';

export async function getNetworks(): Promise<Network[]> {
  const response = await fetch(`${API_URL}/networks`);
  if (!response.ok) throw new Error('Failed to fetch networks');
  return response.json();
}

export async function createNetwork(network: Omit<Network, 'id'>): Promise<{ id: string }> {
  const response = await fetch(`${API_URL}/networks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(network),
  });
  if (!response.ok) throw new Error('Failed to create network');
  return response.json();
}

export async function updateNetwork(id: string, network: Partial<Network>): Promise<void> {
  const response = await fetch(`${API_URL}/networks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(network),
  });
  if (!response.ok) throw new Error('Failed to update network');
}

export async function deleteNetwork(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/networks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete network');
}