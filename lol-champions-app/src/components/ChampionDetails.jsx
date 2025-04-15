import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "../api/favorites";
import llorando from "/triste.png";

export default function ChampionDetails() {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);
  const version = "14.8.1";

  const handleAdd = async () => {
    const res = await addFavorite(champion);
    alert(res.message);
  };

  const handleRemove = async () => {
    const res = await removeFavorite(champion.id);
    alert(res.message);
  };

  useEffect(() => {
    const fetchChampionDetails = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${id}.json`
        );
        const data = await response.json();
        const champData = data.data[id];
        setChampion(champData);
      } catch (error) {
        console.error("Error fetching champion details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChampionDetails();
  }, [id]);

  if (loading)
    return <div className="text-white text-center mt-10">Cargando...</div>;

  if (!champion)
    return (
      <div className="text-shadow-black text-center mt-10">
        Campeón no encontrado
        <div className="flex justify-center items-center">
          <img
            src={llorando}
            alt="No encontramos ni el icono de encontrar"
            className="max-w-xs max-h-xs"
          />
        </div>
      </div>
    );

  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

  return (
    <div className="bg-[url('/Fondo2.jpg')] bg-fixed bg-cover bg-center min-h-screen text-white">
      <div className="max-w-4xl mx-auto backdrop-blur-xs">
        <img
          src={imgUrl}
          alt={champion.name}
          className="w-full rounded-xl mb-6 "
        />
        <h1 className="text-4xl font-bold mb-2 text-shadow-lg/30 ">
          {champion.name}
        </h1>
        <h2 className="text-xl text-gray-400 mb-6 italic text-shadow-lg/30">
          {champion.title}
        </h2>
        <p></p>
        <h2>Lore</h2>
        <p className="text-lg leading-relaxed mb-4 text-shadow-lg/30">
          {champion.lore}
        </p>
        <h2 className="underline decoration-4">Ally Tips</h2>
        <p className="text-lg leading-relaxed mb-4">{champion.allytips}</p>
        <h2 className="underline decoration-4">Enemy Tips</h2>
        <p className="text-lg leading-relaxed mb-4 ">{champion.enemytips}</p>

        <div className="flex gap-4">
          <button
            onClick={handleAdd}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Añadir a Favoritos
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Quitar de Favoritos
          </button>
        </div>
      </div>
    </div>
  );
}
