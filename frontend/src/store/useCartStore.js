import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => set((state) => {
        const found = state.cart.find(i => i.id === product.id);
        if (found) {
          return { cart: state.cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(i => i.id !== id)
      })),
      updateQuantity: (id, qty) => set((state) => ({
        cart: state.cart.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)
      })),
      clearCart: () => set({ cart: [] }),
      getTotalPrice: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { name: 'indian_store_cart' }
  )
);