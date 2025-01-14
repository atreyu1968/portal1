import { FormSubmission } from '../types/content';

const API_URL = '/api';

export async function getSubmissions(): Promise<FormSubmission[]> {
  const response = await fetch(`${API_URL}/submissions`);
  if (!response.ok) throw new Error('Failed to fetch submissions');
  return response.json();
}

export async function createSubmission(submission: Omit<FormSubmission, 'id' | 'status' | 'submittedAt'>): Promise<{ id: string }> {
  const response = await fetch(`${API_URL}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submission),
  });
  if (!response.ok) throw new Error('Failed to create submission');
  return response.json();
}

export async function updateSubmissionStatus(id: string, status: FormSubmission['status']): Promise<void> {
  const response = await fetch(`${API_URL}/submissions/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update submission status');
}

export async function deleteSubmission(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/submissions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete submission');
}