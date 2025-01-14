import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Admin, AuthState } from '../types/auth';
import { hashPassword, verifyPassword } from '../utils/crypto';

const defaultAdmin: Admin = {
  id: '1',
  username: 'admin',
  password: hashPassword('admin123'),
  role: 'superadmin',
  name: 'Administrador',
  email: 'admin@example.com',
  createdAt: new Date().toISOString(),
  status: 'active'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      admins: [defaultAdmin],

      login: (username: string, password: string) => {
        const admin = get().admins.find(
          (a) => a.username === username && a.status === 'active'
        );

        if (admin && verifyPassword(password, admin.password)) {
          const updatedAdmin = {
            ...admin,
            lastLogin: new Date().toISOString()
          };

          set((state) => ({
            isAuthenticated: true,
            user: updatedAdmin,
            admins: state.admins.map((a) =>
              a.id === admin.id ? updatedAdmin : a
            )
          }));
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null
        });
      },

      addAdmin: (adminData) => {
        const newAdmin: Admin = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          password: hashPassword(adminData.password),
          ...adminData
        };

        set((state) => ({
          admins: [...state.admins, newAdmin]
        }));
      },

      updateAdmin: (id, updates) => {
        set((state) => ({
          admins: state.admins.map((admin) =>
            admin.id === id
              ? {
                  ...admin,
                  ...updates,
                  password: updates.password
                    ? hashPassword(updates.password)
                    : admin.password
                }
              : admin
          )
        }));
      },

      deleteAdmin: (id) => {
        set((state) => ({
          admins: state.admins.filter((admin) => admin.id !== id)
        }));
      },

      updateAdminStatus: (id, status) => {
        set((state) => ({
          admins: state.admins.map((admin) =>
            admin.id === id ? { ...admin, status } : admin
          )
        }));
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        admins: state.admins
      })
    }
  )
);