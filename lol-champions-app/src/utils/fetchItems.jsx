export async function fetchItems() {
  const version = "15.7.1";
  const itemsUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`;

  try {
    const response = await fetch(itemsUrl);
    const data = await response.json();

    const items = Object.entries(data.data).map(([id, item]) => ({
      ...item,
      id,
    }));

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      plaintext: item.plaintext,
      image: item.image,
      gold: item.gold,
      tags: item.tags,
      stats: item.stats,
    }));
  } catch (error) {
    console.error("Error al obtener los ítems:", error);
    return [];
  }
}
