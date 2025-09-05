import type { Product } from "./products";

export type ProductQuantities = Record<Product["id"], number>;

export type CartLineItem = {
  product: Product;
  quantity: number;
  total: number;
};

export type CartTotals = {
  cartItems: CartLineItem[];
  subtotal: number;
  totalItems: number;
  discountCount: number;
  discount: number;
  total: number;
};

export function computeTotals(
  quantities: ProductQuantities,
  products: Product[],
): CartTotals {
  const cartItems: CartLineItem[] = products
    .filter((product) => (quantities[product.id] ?? 0) > 0)
    .map((product) => ({
      product,
      quantity: quantities[product.id] ?? 0,
      total: (quantities[product.id] ?? 0) * product.price,
    }));

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const totalItems = Object.values(quantities).reduce(
    (acc, qty) => acc + (qty ?? 0),
    0,
  );
  const discountCount = Math.floor(totalItems / 2);
  const discount = discountCount * 10;
  const total = Math.max(0, subtotal - discount);

  return { cartItems, subtotal, totalItems, discountCount, discount, total };
}

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  return USD_FORMATTER.format(amount);
}
