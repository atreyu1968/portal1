import { Admin } from '../types/auth';

const API_URL = '/api';

export async function login(username: string, password: string): Promise<Admin> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json();
}