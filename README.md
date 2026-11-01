# Microfrontend sample: React + TypeScript + Module Federation

A small bike-parts shop split into independently built apps:

| App | Port | Role |
| --- | --- | --- |
| `apps/host` | 3000 | Shell. Loads both remotes at runtime and shows the cart badge. |
| `apps/catalog` | 3001 | Remote. Exposes `./Catalog`, emits `cart:add`. |
| `apps/cart` | 3002 | Remote. Exposes `./Cart`, listens for `cart:add`, emits `cart:count`. |
| `packages/contracts` | n/a | Shared event names, payload types and a typed event bus. |

## Run

```bash
npm install
npm run dev        # starts all three dev servers
```

Open http://localhost:3000. Each remote also runs on its own at its port.

## Try this

- Stop the cart dev server and reload the host: the cart frame shows an error while the catalog keeps working.
- Edit `apps/catalog/src/Catalog.tsx`: only the catalog rebuilds.

## How it fits together

- **Module Federation** (`webpack.config.js` in each app): remotes expose components through `remoteEntry.js`; the host lists them under `remotes`.
- **Shared React**: `react` and `react-dom` are `singleton`, so only one copy is on the page.
- **Async bootstrap**: `src/index.ts` only calls `import("./bootstrap")` so shared modules resolve before React starts.
- **Communication**: apps never import each other. They send typed `CustomEvent`s on `window` through `@mfe/contracts`.
- **Typing remotes**: `apps/host/src/remotes.d.ts` declares the runtime-only modules.

## Production

`npm run build` builds each app into its own `dist/`. Deploy each one independently and point the host's `remotes` URLs at the deployed `remoteEntry.js` files.
