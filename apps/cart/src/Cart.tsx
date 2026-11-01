import "./cart.css";
import { useEffect, useState } from "react";
import { emit, formatPrice, on, type Product } from "@mfe/contracts";

interface Line {
  product: Product;
  qty: number;
}

export default function Cart() {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(
    () =>
      on("cart:add", (product) =>
        setLines((prev) => {
          const hit = prev.find((l) => l.product.id === product.id);
          return hit
            ? prev.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l))
            : [...prev, { product, qty: 1 }];
        })
      ),
    []
  );

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.product.priceInr, 0);

  // Tell the shell how many items are in the cart (it shows the badge).
  useEffect(() => emit("cart:count", { count }), [count]);

  const remove = (id: string) => setLines((prev) => prev.filter((l) => l.product.id !== id));

  return (
    <div className="cart">
      <h2 className="cart__title">Your cart</h2>
      {lines.length === 0 ? (
        <p className="cart__empty">Nothing here yet. Add a part from the catalog.</p>
      ) : (
        <>
          <ul className="cart__list">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="cart__row">
                <span>
                  {qty} × {product.name}
                </span>
                <button className="cart__remove" onClick={() => remove(product.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="cart__total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </p>
        </>
      )}
    </div>
  );
}
