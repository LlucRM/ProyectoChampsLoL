import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ChampionDetails() {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);
  const version = "14.8.1";

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
      <div className="text-white text-center mt-10">Campeón no encontrado</div>
    );

  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <img
          src={imgUrl}
          alt={champion.name}
          className="w-full rounded-xl mb-6"
        />
        <h1 className="text-4xl font-bold mb-2">{champion.name}</h1>
        <h2 className="text-xl text-gray-400 mb-6 italic">{champion.title}</h2>
        <p className="text-lg leading-relaxed">{champion.lore}</p>
      </div>
    </div>
  );
}
