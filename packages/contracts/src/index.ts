// The only thing the micro frontends share: types and a typed event bus.
export interface Product {
  id: string;
  name: string;
  priceInr: number;
}

export interface EventMap {
  "cart:add": Product;
  "cart:count": { count: number };
}

export function emit<K extends keyof EventMap>(type: K, detail: EventMap[K]): void {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}

export function on<K extends keyof EventMap>(
  type: K,
  handler: (detail: EventMap[K]) => void
): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<EventMap[K]>).detail);
  window.addEventListener(type, listener);
  return () => window.removeEventListener(type, listener);
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
