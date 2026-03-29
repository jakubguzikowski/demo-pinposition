import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Greens from "./pages/Greens";
import Tournaments from "./pages/Tournaments";
import TournamentCreate from "./pages/Tournaments/TournamentCreate";
import TournamentEdit from "./pages/Tournaments/TournamentEdit";
import TournamentDetail from "./pages/Tournaments/TournamentDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/greens" element={<Greens />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/create" element={<TournamentCreate />} />
        <Route path="/tournaments/:id" element={<TournamentDetail />} />
        <Route path="/tournaments/:id/edit" element={<TournamentEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
