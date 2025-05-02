import React, { useEffect, useState } from "react";
import { fetchItems } from "../utils/fetchItems";

const ItemFilter = ({ selectedTag, onTagChange }) => {
  const [items, setItems] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);

      const tagsSet = new Set();
      fetchedItems.forEach((item) => {
        item.tags?.forEach((tag) => tagsSet.add(tag));
      });

      setUniqueTags([...tagsSet]);
    };

    loadItems();
  }, []);

  return (
    <div className="mb-14">
      <select
        value={selectedTag}
        onChange={(e) => onTagChange(e.target.value)}
        className="p-3 rounded-lg bg-gray-800 text-white shadow-lg"
      >
        <option value="">Filtrar Por Tipo</option>
        {uniqueTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemFilter;
