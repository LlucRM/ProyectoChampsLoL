export async function fetchChampions(language = "en_US") {
  const version = "15.8.1";

  const championsUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`;

  try {
    const response = await fetch(championsUrl);
    const data = await response.json();

    const champions = Object.values(data.data);

    const championsWithSpells = await Promise.all(
      champions.map(async (champion) => {
        const championUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${champion.id}.json`;

        const champResponse = await fetch(championUrl);
        const champData = await champResponse.json();

        const champ = champData.data[champion.id];

        champion.spells = champ.spells.map((spell) => ({
          ...spell,
          cost: spell.costBurn,
        }));

        return champion;
      })
    );

    return championsWithSpells;
  } catch (error) {
    console.error("Error al obtener los campeones:", error);
    return [];
  }
}
