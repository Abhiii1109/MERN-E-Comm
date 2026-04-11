import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../lib/api';
import { useCartStore } from './cartStore';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api.post('/auth/login', { email, password });
          localStorage.setItem('luxe_token', data.token);
          set({ user: data.user, token: data.token, isLoading: false });
          if (data.user?.cart) {
            useCartStore.getState().setItems(data.user.cart);
          }
          return data;
        } catch (err) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api.post('/auth/register', { name, email, password });
          localStorage.setItem('luxe_token', data.token);
          set({ user: data.user, token: data.token, isLoading: false });
          if (data.user?.cart) {
            useCartStore.getState().setItems(data.user.cart);
          }
          return data;
        } catch (err) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem('luxe_token');
        set({ user: null, token: null });
        useCartStore.getState().clearCart();
      },

      updateProfile: async (updates) => {
        const data = await api.put('/auth/profile', updates);
        set({ user: data.user });
        return data;
      },

      clearError: () => set({ error: null }),

      isAuthenticated: () => !!get().token && !!get().user,
    }),
    {
      name: 'luxe-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
