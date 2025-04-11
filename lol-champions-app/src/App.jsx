import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChampionDetails from "./components/ChampionDetails";
import NavPrincipal from "./components/NavPrincipal";

export default function App() {
  return (
    <Router>
      <NavPrincipal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champion/:id" element={<ChampionDetails />} />
      </Routes>
    </Router>
  );
}
