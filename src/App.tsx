import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { store } from "./store";
import { Provider } from "react-redux";

import "./App.css";
import { Home } from "./pages/Home";

import { VisualizerPage } from "./pages/Visualizer";

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<VisualizerPage />} />
        </Routes>
      </AnimatePresence>
    </Provider>
  );
}

export default App;
