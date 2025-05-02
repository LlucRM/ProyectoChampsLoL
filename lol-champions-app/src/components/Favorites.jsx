import { useEffect, useState } from "react";
import { fetchFavorites, removeFavorite } from "../api/favorites";
import { useUser } from "../context/UserContext";
import championsRoleData from "../../../championsRoles.json";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username) {
      fetchFavorites(user)
        .then((data) => {
          setFavorites(data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al cargar los favoritos:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleRemoveFavorite = (champion) => {
    if (user?.username) {
      removeFavorite(champion, user)
        .then(() => {
          setFavorites((prev) => prev.filter((fav) => fav !== champion));
        })
        .catch((error) => {
          console.error("Error al eliminar favorito:", error);
        });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Debes iniciar sesión para ver tus favoritos.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Cargando favoritos...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">
      <h1 className="text-4xl font-bold text-center my-8 drop-shadow-lg text-gray-50">
        Favoritos
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {favorites.map((championName) => {
          const champion = championsRoleData[championName];
          if (!champion) return null;

          const imgUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;

          const handleClick = () => {
            navigate(`/champion/${championName}`);
          };

          return (
            <div
              key={championName}
              onClick={handleClick}
              className="bg-gray-900 rounded-2xl shadow-md text-white cursor-pointer hover:scale-105 transition-transform overflow-hidden"
            >
              <img
                src={imgUrl}
                alt={championName}
                className="w-full h-48 object-cover"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavorite(championName);
                }}
                className="w-full py-2 text-sm text-red-400 hover:underline bg-gray-800"
              >
                Eliminar Favorito
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
