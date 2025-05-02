import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./Home";
import ChampionDetails from "./components/ChampionDetails";
import NavPrincipal from "./components/NavPrincipal";
import Favorites from "./components/Favorites";
import ItemsPage from "./components/ItemsPage";
import ItemDetails from "./components/ItemDetail";
import { LanguageProvider } from "./context/LanguageContext";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/Loginform";
import Profile from "./components/UserProfile";
import { UserProvider } from "./context/UserContext";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Cargar usuario desde la cookie si existe
    }
  }, []);

  return (
    <UserProvider>
      {" "}
      <LanguageProvider>
        <Router>
          <NavPrincipal setUser={setUser} />{" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/champion/:id" element={<ChampionDetails />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="/ItemsPage" element={<ItemsPage />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/RegisterForm" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile />} />{" "}
            <Route
              path="/LoginForm"
              element={<LoginForm setUser={setUser} />}
            />
          </Routes>
        </Router>
      </LanguageProvider>
    </UserProvider>
  );
}
