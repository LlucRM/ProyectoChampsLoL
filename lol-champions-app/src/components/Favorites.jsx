import { useEffect, useState } from "react";
import { fetchFavorites, removeFavorite } from "../api/favorites";
import { useNavigate } from "react-router-dom";

const Favorites = ({ champion }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites().then(setFavorites);
  }, []);

  const handleRemoveFavorite = (champId) => {
    removeFavorite(champId)
      .then(() => {
        setFavorites(favorites.filter((champ) => champ.id !== champId));
      })
      .catch((error) => {
        console.error("Error al eliminar favorito:", error);
      });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">
      <h1 className="text-4xl font-bold text-center my-8 drop-shadow-lg text-gray-50">
        Favoritos
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((champ) => (
          <div
            key={champ.id}
            className="bg-black rounded-2xl shadow-md text-white p-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(`/champion/${champ.id}`)}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`}
              alt={champ.name}
              className="w-full h-48 object-cover rounded-xl"
            />

            <h3 className="mt-2 font-semibold">{champ.name}</h3>
            <p className="text-sm">{champ.title}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFavorite(champ.id);
              }}
              className="mt-2 text-sm text-red-500 hover:underline"
            >
              Eliminar Favorito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
