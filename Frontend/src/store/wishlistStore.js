import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const { items } = get();
        const exists = items.find((i) => i._id === product._id);
        if (exists) {
          set({ items: items.filter((i) => i._id !== product._id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isWishlisted: (productId) =>
        get().items.some((i) => i._id === productId),

      clear: () => set({ items: [] }),
    }),
    { name: 'luxe-wishlist' }
  )
);
