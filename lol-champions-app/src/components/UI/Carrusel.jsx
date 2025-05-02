import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from "../../context/LanguageContext";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { fetchFavorites } from "../../api/favorites";

function Carrusel() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useUser();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center text-white">Cargando...</p>;

  if (!user) {
    return (
      <p className="text-center text-white">
        Debes iniciar sesión para ver tus favoritos.
      </p>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 rounded-lg"
            src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
            alt="Default slide"
          />
          <Carousel.Caption>
            <h3>Sin favoritos</h3>
            <p>Añade campeones favoritos para verlos aquí.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  return (
    <Carousel>
      {favorites.map((championName) => (
        <Carousel.Item
          key={championName}
          onClick={() => navigate(`/champion/${championName}`)}
          style={{ cursor: "pointer" }}
        >
          <img
            className="d-block w-100 rounded-lg"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`}
            alt={championName}
          />
          <Carousel.Caption>
            <h3>{championName}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrusel;
