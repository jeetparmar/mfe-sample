import { lazy, useEffect, useState } from "react";
import { on } from "@mfe/contracts";
import RemoteBoundary from "./RemoteBoundary";

// Loaded from other apps at runtime, not bundled into the host.
const Catalog = lazy(() => import("catalog/Catalog"));
const Cart = lazy(() => import("cart/Cart"));

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => on("cart:count", (d) => setCount(d.count)), []);

  return (
    <div className="shell">
      <header className="shell__header">
        <h1 className="shell__brand">Spoke &amp; Chain</h1>
        <span className="shell__badge" aria-live="polite">
          Cart: {count} {count === 1 ? "item" : "items"}
        </span>
      </header>
      <main className="shell__main">
        <RemoteBoundary owner="catalog · localhost:3001" color="#1f4bff">
          <Catalog />
        </RemoteBoundary>
        <RemoteBoundary owner="cart · localhost:3002" color="#0e8f6b">
          <Cart />
        </RemoteBoundary>
      </main>
    </div>
  );
}
