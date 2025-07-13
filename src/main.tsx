import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./components/App/App";

const tree = document.getElementById("root")!;
const root = createRoot(tree as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode >

);