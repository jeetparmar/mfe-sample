import { createRoot } from "react-dom/client";
import Catalog from "./Catalog";

// Standalone mode: run this micro frontend on its own at localhost:3001.
createRoot(document.getElementById("root")!).render(<Catalog />);
