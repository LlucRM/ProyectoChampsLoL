import { useEffect, useState } from "react";
import Input from "./UI/Input";
import Spinner from "./UI/Spinner";
import ItemCard from "./ItemCard";
import { fetchItems } from "../utils/fetchItems";
import ItemFilter from "./ItemFilter";
import { useLanguage } from "../context/LanguageContext";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    fetchItems(language)
      .then((data) => setItems(data))
      .catch((error) => console.error("Error al obtener los ítems:", error))
      .finally(() => setLoading(false));
  }, [language]);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center p-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <ItemFilter
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar Ítem"
              className="mb-12 w-72 p-3 rounded-lg bg-gray-800 text-white shadow-lg placeholder-gray-400"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
