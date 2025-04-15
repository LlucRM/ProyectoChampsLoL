import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChampionDetails from "./components/ChampionDetails";
import NavPrincipal from "./components/NavPrincipal";
import Favorites from "./components/Favorites";
import ItemsPage from "./components/ItemsPage";
import ItemDetails from "./components/ItemDetail";

export default function App() {
  return (
    <Router>
      <NavPrincipal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champion/:id" element={<ChampionDetails />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/ItemsPage" element={<ItemsPage />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
    </Router>
  );
}
