// Simple password hashing for demo purposes
// In production, use a proper hashing library like bcrypt
export function hashPassword(password: string): string {
  return btoa(password);
}

export function verifyPassword(password: string, hash: string): boolean {
  return btoa(password) === hash;
}