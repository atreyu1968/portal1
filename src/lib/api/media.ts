interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploaded_at: string;
}

const API_URL = '/api';

export async function getMedia(): Promise<MediaFile[]> {
  const response = await fetch(`${API_URL}/media`);
  if (!response.ok) throw new Error('Failed to fetch media');
  return response.json();
}

export async function uploadMedia(file: File): Promise<{ id: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/media`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload media');
  return response.json();
}

export async function deleteMedia(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/media/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete media');
}