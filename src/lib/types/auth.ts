export interface Admin {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'superadmin';
  name: string;
  email: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Admin | null;
  admins: Admin[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addAdmin: (admin: Omit<Admin, 'id' | 'createdAt'>) => void;
  updateAdmin: (id: string, updates: Partial<Admin>) => void;
  deleteAdmin: (id: string) => void;
  updateAdminStatus: (id: string, status: Admin['status']) => void;
}