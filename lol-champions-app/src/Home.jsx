import { useEffect, useState } from "react";
import Input from "./components/UI/Input";
import { fetchChampions } from "./utils/fetchChampions";
import ChampionCard from "./components/ChampionCard";
import draven from "/Draven.jpg";
import zoe from "/Zoe.jpg";
import Spinner from "./components/UI/Spinner";
import championsRoleData from "../../championsRoles.json";
import RoleFilter from "./components/RoleFilter";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Carrusel from "./components/UI/Carrusel";
import { fetchFavorites } from "./api/favorites";

export default function Home() {
  const [champions, setChampions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchChampions()
      .then((data) => setChampions(data))
      .catch((error) => console.error("Error al obtener los campeones:", error))
      .finally(() => setLoading(false));

    fetchFavorites().then(setFavorites);

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filtered = champions.filter((champ) => {
    const matchesSearch = champ.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRole = selectedRole
      ? championsRoleData[champ.name]?.includes(selectedRole)
      : true;
    return matchesSearch && matchesRole;
  });

  const opacityDraven = Math.max(0, 1 - scrollY / 500);
  const opacityZoe = Math.max(0, 1 - scrollY / 500);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center p-4">
        {loading ? (
          <div className="text-xl text-white">
            <Spinner />
          </div>
        ) : (
          <>
            {favorites.length === 0 && (
              <div className="flex gap-8 mb-8">
                <NavLink to="/champion/Draven">
                  <motion.img
                    src={draven}
                    alt="Draven imagen"
                    className="w-150 h-auto rounded-lg shadow-xl transform transition-transform duration-300 hover:-translate-y-2"
                    style={{ opacity: opacityDraven }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: opacityDraven }}
                    transition={{ duration: 0.5 }}
                  />
                </NavLink>
                <NavLink to="/champion/Zoe">
                  <motion.img
                    src={zoe}
                    alt="Zoe imagen"
                    className="w-150 h-auto rounded-lg shadow-xl transform transition-transform duration-300 hover:-translate-y-2"
                    style={{ opacity: opacityZoe }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: opacityZoe }}
                    transition={{ duration: 0.5 }}
                  />
                </NavLink>
              </div>
            )}

            {favorites.length > 0 && (
              <div className="mb-12 w-full max-w-6xl">
                <Carrusel favorites={favorites} />
              </div>
            )}

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar Champ"
              className="mb-12 w-72 p-3 rounded-lg bg-gray-800 text-white shadow-lg placeholder-gray-400"
            />
            <RoleFilter
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {filtered.map((champ) => (
                <ChampionCard key={champ.id} champion={champ} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
