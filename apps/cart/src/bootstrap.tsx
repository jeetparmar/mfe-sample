import { createRoot } from "react-dom/client";
import Cart from "./Cart";

// Standalone mode: run this micro frontend on its own at localhost:3002.
createRoot(document.getElementById("root")!).render(<Cart />);
