import { useNavigate } from "react-router-dom";

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  const version = "15.7.1";
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;

  const handleClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-900 rounded-2xl shadow-md text-white p-4 cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="flex items-center">
        <img
          src={imgUrl}
          alt={item.name}
          className="rounded-lg w-24 h-24 mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-400 text-sm">{item.plaintext}</p>
          <p className="text-yellow-400 text-sm mt-1">
            💰 {item.gold.total} oro
          </p>
        </div>
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-center">Tipo:</h3>
          <div className="flex flex-wrap gap-2 justify-center mt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
