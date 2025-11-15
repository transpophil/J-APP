import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CrewProvider } from "@/contexts/CrewContext";

createRoot(document.getElementById("root")!).render(
  <CrewProvider>
    <App />
  </CrewProvider>
);