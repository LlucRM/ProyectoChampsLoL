import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import llorando from "/triste.png";
import { useLanguage } from "../context/LanguageContext";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const version = "15.7.1";
  const { language } = useLanguage();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/item.json`
        );
        const data = await response.json();
        const itemData = data.data[String(id)];

        if (itemData) {
          setItem(itemData);
        } else {
          setItem(null);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id, language]);

  if (loading)
    return <div className="text-white text-center mt-10">Cargando...</div>;

  if (!item)
    return (
      <div className="text-shadow-black text-center mt-10">
        Ítem no encontrado
        <div className="flex justify-center items-center">
          <img
            src={llorando}
            alt="No encontramos ni el icono de encontrar"
            className="max-w-xs max-h-xs"
          />
        </div>
      </div>
    );

  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;

  return (
    <div className="bg-[url('/Fondo2.jpg')] bg-fixed bg-cover bg-center min-h-screen text-white">
      <div className="max-w-4xl mx-auto backdrop-blur-xs p-6">
        <img src={imgUrl} alt={item.name} className="w-24 h-24 mb-4 rounded" />
        <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
        <p className="text-gray-400 italic mb-4">{item.plaintext}</p>

        <div
          className="text-lg leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />

        <p className="text-yellow-400 font-semibold mb-4">
          💰 Costo total: {item.gold.total} oro
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold">Tags:</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-indigo-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
