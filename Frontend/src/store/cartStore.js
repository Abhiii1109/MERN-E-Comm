import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existing = items.find((i) => i._id === product._id);
        if (existing) {
          set({
            items: items.map((i) =>
              i._id === product._id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i._id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i._id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      
      setItems: (newItems) => set({ items: newItems || [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + (i.discountedPrice || i.price) * i.quantity,
          0
        ),
    }),
    { name: 'luxe-cart' }
  )
);
