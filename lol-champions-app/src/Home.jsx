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

export default function Home() {
  const [champions, setChampions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    fetchChampions()
      .then((data) => {
        console.log("Datos de los campeones:", data);
        setChampions(data);
      })
      .catch((error) => {
        console.error("Error al obtener los campeones:", error);
      })
      .finally(() => {
        setLoading(false);
      });
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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-900 to-black text-white p-4">
      {loading ? (
        <div className="text-xl text-white">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex gap-8 mb-8">
            <NavLink to="/champion/Draven">
              <img
                src={draven}
                alt="Draven imagen"
                className="w-150 h-auto rounded-lg shadow-xl transform transition-transform duration-300 hover:translate-y-[-10px]"
              />
            </NavLink>
            <NavLink to="/champion/Zoe">
              <img
                src={zoe}
                alt="Zoe imagen"
                className="w-150 h-auto rounded-lg shadow-xl transform transition-transform duration-300 hover:translate-y-[-10px]"
              />
            </NavLink>
          </div>

          {/* Componente Input para buscar campeones */}
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

          {/* Mostrar los campeones filtrados */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {filtered.map((champ) => (
              <ChampionCard key={champ.id} champion={champ} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
