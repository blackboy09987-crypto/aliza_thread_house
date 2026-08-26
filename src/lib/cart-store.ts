import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  image: string | null;
  quantity: number;
  stock: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? {
                    ...i,
                    quantity: Math.min(i.quantity + quantity, i.stock || 99),
                  }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity }] });
        }
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      setQuantity: (productId, quantity) =>
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock || 99)) }
              : i
          ),
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "aliza-cart" }
  )
);

export function cartTotals(items: CartItem[]) {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalCents = items.reduce((sum, i) => sum + i.quantity * i.priceCents, 0);
  return { totalItems, totalCents };
}
