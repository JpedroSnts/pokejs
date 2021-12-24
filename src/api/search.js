import jsonPkmn from "./data.json";

export default async function searchPokemon(textSearch, setCurrentGeneration) {
  const result = [];
  if (textSearch > 898) {
    return false;
  }
  const json = jsonPkmn;

  for (let i = 0; i < 898; i++) {
    if (textSearch === "ditto") textSearch = "ditto?";
    if (json[i].id === parseInt(textSearch) || json[i].name === textSearch) {
      setCurrentGeneration(json[i].generation);
      result.push({
        id: json[i].id,
        name: json[i].name,
        types: json[i].types,
        generation: json[i].generation,
        image: json[i].image,
      });
    }
  }
  if (result.length === 0) {
    setCurrentGeneration(1);
    return false;
  }
  return result;
}
