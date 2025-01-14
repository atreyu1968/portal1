import { PageContent } from '../types/content';

const API_URL = '/api';

export async function getPages(): Promise<PageContent[]> {
  const response = await fetch(`${API_URL}/pages`);
  if (!response.ok) throw new Error('Failed to fetch pages');
  return response.json();
}

export async function createPage(page: Omit<PageContent, 'id'>): Promise<{ id: string }> {
  const response = await fetch(`${API_URL}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(page),
  });
  if (!response.ok) throw new Error('Failed to create page');
  return response.json();
}

export async function updatePage(id: string, page: Partial<PageContent>): Promise<void> {
  const response = await fetch(`${API_URL}/pages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(page),
  });
  if (!response.ok) throw new Error('Failed to update page');
}

export async function deletePage(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/pages/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete page');
}