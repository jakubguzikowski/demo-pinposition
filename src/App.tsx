import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Greens from "./pages/Greens";
import Pins from "./pages/Pins";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/greens" element={<Greens />} />
        <Route path="/pins" element={<Pins />} />
      </Route>
    </Routes>
  );
}

export default App;