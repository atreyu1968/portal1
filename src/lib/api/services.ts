import { Service } from '../types/content';

const API_URL = '/api';

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/services`);
  if (!response.ok) throw new Error('Failed to fetch services');
  return response.json();
}

export async function createService(service: Omit<Service, 'id'>): Promise<{ id: string }> {
  const response = await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });
  if (!response.ok) throw new Error('Failed to create service');
  return response.json();
}

export async function updateService(id: string, service: Partial<Service>): Promise<void> {
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });
  if (!response.ok) throw new Error('Failed to update service');
}

export async function deleteService(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/services/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete service');
}