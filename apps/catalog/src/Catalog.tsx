import "./catalog.css";
import { emit, formatPrice, type Product } from "@mfe/contracts";

const PRODUCTS: Product[] = [
  { id: "tyre-700x40", name: "Gravel tyre 700×40c", priceInr: 3200 },
  { id: "pads-hyd", name: "Hydraulic brake pads", priceInr: 1450 },
  { id: "chain-11s", name: "11-speed chain", priceInr: 2100 },
  { id: "light-dyno", name: "Dynamo hub light", priceInr: 4800 },
  { id: "tape-bar", name: "Handlebar tape", priceInr: 950 },
  { id: "sealant-250", name: "Tubeless sealant, 250 ml", priceInr: 850 },
];

export default function Catalog() {
  return (
    <div className="catalog">
      <h2 className="catalog__title">Parts</h2>
      <ul className="catalog__list">
        {PRODUCTS.map((p) => (
          <li key={p.id} className="catalog__row">
            <span className="catalog__name">{p.name}</span>
            <span className="catalog__price">{formatPrice(p.priceInr)}</span>
            <button className="catalog__add" onClick={() => emit("cart:add", p)}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
