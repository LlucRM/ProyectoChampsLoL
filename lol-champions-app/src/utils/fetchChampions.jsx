export async function fetchChampions() {
  const version = "13.1.1";
  const championsUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;

  const response = await fetch(championsUrl);
  const data = await response.json();

  const champions = Object.values(data.data);

  const championsWithSpells = await Promise.all(
    champions.map(async (champion) => {
      const championUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champion.id}.json`;

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
}
