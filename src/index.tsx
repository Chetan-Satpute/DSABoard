import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

const App = React.lazy(() => import("./routes/App"));
const Docs = React.lazy(() => import("./routes/Docs"));
import Landing from "./components/Landing";

import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <React.Suspense fallback={<Landing />}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </HashRouter>
    </React.Suspense>
  </React.StrictMode>
);

