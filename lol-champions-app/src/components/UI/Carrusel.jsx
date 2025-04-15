import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Carrusel({ favorites }) {
  const navigate = useNavigate();

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
      {favorites.map((champ) => (
        <Carousel.Item
          key={champ.id}
          onClick={() => navigate(`/champion/${champ.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img
            className="d-block w-100 rounded-lg"
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`}
            alt={champ.name}
          />
          <Carousel.Caption>
            <h3>{champ.name}</h3>
            <p>{champ.title}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrusel;
