import { useNavigate } from "react-router-dom";
import championsRoleData from "../../../championsRoles.json";

export default function ChampionCard({ champion }) {
  const navigate = useNavigate();
  const version = "14.8.1";
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;
  const champRole = championsRoleData[champion.name]?.[0] || "Ns";

  const handleClick = () => {
    navigate(`/champion/${champion.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-black rounded-2xl shadow-md text-white p-4 cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="flex items-center">
        <img
          src={imgUrl}
          alt={champion.name}
          className="rounded-lg w-24 h-24 mr-4"
        />
        <div>
          <h2 className="text-center mt-5 text-lg">{champion.name}</h2>
          <p className="text-gray-400">{champion.title}</p>
          <p>{champRole}</p>
        </div>
      </div>

      {champion.spells &&
      Array.isArray(champion.spells) &&
      champion.spells.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-center text-sm font-semibold">Habilidades:</h2>
          <ul className="list-disc pl-4">
            {champion.spells.map((spell, index) => (
              <li
                key={index}
                className="text-sm flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 p-2 rounded-md mb-2"
              >
                <span className="font-semibold text-yellow-400">
                  {spell.name}:
                </span>
                <span className="text-gray-300"> {spell.cost}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-center text-gray-400">
          No hay habilidades disponibles
        </p>
      )}
    </div>
  );
}
