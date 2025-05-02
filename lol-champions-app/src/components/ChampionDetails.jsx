// ChampionDetails.jsx (React)

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "../api/favorites";
import llorando from "/triste.png";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";

export default function ChampionDetails() {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const version = "15.8.1";
  const { language } = useLanguage();
  const { user } = useUser();

  const fetchChampionDetails = async () => {
    try {
      const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${id}.json`
      );
      const data = await response.json();
      setChampion(data.data[id]);
    } catch (error) {
      console.error("Error fetching champion details:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/comments?champId=${id}`
      );
      const result = await res.json();
      setComments(result.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchChampionDetails();
    fetchComments();
    setLoading(false);
  }, [id, language]);

  const handleAdd = async () => {
    if (!user) {
      alert("Debes estar logueado para agregar a favoritos");
      return;
    }
    const res = await addFavorite(champion, user);
    if (res) alert("Agregado con Exito ");
    else alert("Error al agregar favorito");
  };

  const handleRemove = async () => {
    if (!user) {
      alert("Debes estar logueado para quitar de favoritos");
      return;
    }
    const res = await removeFavorite(champion.id, user);
    alert(res.message);
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Debes estar logueado para comentar");
      return;
    }
    if (!newComment.trim()) {
      alert("El comentario no puede ir vacío");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/users/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          champId: champion.id,
          comment: newComment.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewComment("");
        fetchComments();
      } else {
        alert(data.mensaje || "Error al enviar comentario");
      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    }
  };

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
      <div className="max-w-4xl mx-auto backdrop-blur-xs p-6 rounded-xl">
        <img
          src={imgUrl}
          alt={champion.name}
          className="w-full rounded-xl mb-6"
        />
        <h1 className="text-4xl font-bold mb-2 text-shadow-lg/30">
          {champion.name}
        </h1>
        <h2 className="text-xl text-gray-400 mb-6 italic text-shadow-lg/30">
          {champion.title}
        </h2>
        <h2>Lore</h2>
        <p className="text-lg leading-relaxed mb-4 text-shadow-lg/30">
          {champion.lore}
        </p>
        <h2 className="underline decoration-4">Ally Tips</h2>
        <p className="text-lg leading-relaxed mb-4">{champion.allytips}</p>
        <h2 className="underline decoration-4">Enemy Tips</h2>
        <p className="text-lg leading-relaxed mb-4">{champion.enemytips}</p>

        <div className="flex gap-4 mb-6">
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

        {/* Sección de comentarios */}
        <div className="mb-6">
          <h3 className="text-2xl mb-2">Comentarios</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            rows={3}
            placeholder="Escribe tu comentario..."
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Enviar comentario
          </button>
        </div>

        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((c, idx) => (
              <li key={idx} className="bg-gray-800 p-4 rounded-lg">
                <strong>{c.username}</strong>: {c.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Sé el primero en comentar.</p>
        )}
      </div>
    </div>
  );
}
