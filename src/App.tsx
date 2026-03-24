import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Greens from "./pages/Greens";
import Tournaments from "./pages/Tournaments";
import Features from "./pages/Features";
import TournamentCreate from "./pages/Tournaments/TournamentCreate";
import TournamentDetail from "./pages/Tournaments/TournamentDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/greens" element={<Greens />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/features" element={<Features />} />
        <Route path="/tournaments/create" element={<TournamentCreate />} />
        <Route path="/tournaments/:id" element={<TournamentDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
