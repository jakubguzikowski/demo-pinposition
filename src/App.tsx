import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Greens from "./pages/Greens";
import Tournaments from "./pages/Tournaments";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/greens" element={<Greens />} />
        <Route path="/tournaments" element={<Tournaments />} />
      </Route>
    </Routes>
  );
}

export default App;
