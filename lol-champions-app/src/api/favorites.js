const baseUrl = "http://localhost:5000/api/users/favorites";

// ✅ GET favoritos por usuario
export async function fetchFavorites(user) {
  if (!user || !user.username) {
    console.warn("Usuario no definido o incompleto al obtener favoritos");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}?username=${user.username}`);
    if (!res.ok) {
      throw new Error(`Error al obtener favoritos: ${res.statusText}`);
    }
    const data = await res.json();
    return data.favorites || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ✅ POST: Añadir favorito
export const addFavorite = async (champion, user) => {
  if (!user || !user.username) {
    console.warn("Usuario no definido al intentar añadir favorito");
    return;
  }

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      champId: champion.id,
    }),
  });

  return res.json();
};

// ✅ DELETE: Eliminar favorito
export const removeFavorite = async (championId, user) => {
  if (!user || !user.username) {
    console.warn("Usuario no definido al intentar eliminar favorito");
    return;
  }

  const res = await fetch(baseUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      champId: championId,
    }),
  });

  return res.json();
};
