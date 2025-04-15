const baseUrl = "http://localhost:5000/api/favorites";

export async function fetchFavorites() {
  const res = await fetch(baseUrl);
  return await res.json();
}

export async function addFavorite(championData) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(championData),
  });

  return await res.json();
}

export async function removeFavorite(championId) {
  const res = await fetch(`${baseUrl}/${championId}`, {
    method: "DELETE",
  });
  return await res.json();
}
