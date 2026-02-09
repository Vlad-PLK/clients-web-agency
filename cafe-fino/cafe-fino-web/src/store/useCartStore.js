import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    const existing = items.find((cartItem) => cartItem.id === item.id);
    if (existing) {
      set({
        items: items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      });
      return;
    }
    set({ items: [...items, { ...item, quantity: 1 }] });
  },
  removeItem: (id) =>
    set({ items: get().items.filter((item) => item.id !== id) }),
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((item) => item.id !== id) });
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  subtotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useCartStore;
