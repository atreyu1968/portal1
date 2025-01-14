import { SiteSettings } from '../types/settings';

const API_URL = '/api';

export async function getSettings(): Promise<SiteSettings> {
  const response = await fetch(`${API_URL}/settings`);
  if (!response.ok) throw new Error('Failed to fetch settings');
  return response.json();
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<void> {
  const response = await fetch(`${API_URL}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error('Failed to update settings');
}