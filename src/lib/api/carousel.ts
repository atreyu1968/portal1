import { CarouselSlide } from '../types/content';

const API_URL = '/api';

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  const response = await fetch(`${API_URL}/carousel`);
  if (!response.ok) throw new Error('Failed to fetch carousel slides');
  return response.json();
}

export async function createSlide(slide: Omit<CarouselSlide, 'id'>): Promise<{ id: string }> {
  const response = await fetch(`${API_URL}/carousel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slide),
  });
  if (!response.ok) throw new Error('Failed to create slide');
  return response.json();
}

export async function updateSlide(id: string, slide: Partial<CarouselSlide>): Promise<void> {
  const response = await fetch(`${API_URL}/carousel/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slide),
  });
  if (!response.ok) throw new Error('Failed to update slide');
}

export async function deleteSlide(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/carousel/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete slide');
}