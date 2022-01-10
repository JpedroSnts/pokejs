import jsonPkmn from "./data.json";

const generations = [
  { initial: 1, final: 151 },
  { initial: 152, final: 251 },
  { initial: 252, final: 386 },
  { initial: 387, final: 493 },
  { initial: 494, final: 649 },
  { initial: 650, final: 721 },
  { initial: 722, final: 809 },
  { initial: 810, final: 898 },
];

export default async function loadPokemons(currentGeneration: number, amountLoad: number) {
  const result = [];
  const oldGeneration = currentGeneration;
  var initial = generations[currentGeneration - 1].initial - 1;
  var final = initial + amountLoad - 1;
  if (amountLoad + initial >= generations[currentGeneration - 1].final) {
    final = generations[currentGeneration - 1].final - 1;
  }
  for (let i = initial; i <= final; i++) {
    if (currentGeneration !== oldGeneration) loadPokemons(currentGeneration, amountLoad);
    const json = jsonPkmn;
    if (json[i].name === "ditto") json[i].name = "ditto?";
    result.push({
      id: json[i].id,
      name: json[i].name,
      types: json[i].types,
      generation: json[i].generation,
      image: json[i].image,
    });
  }
  return result;
}
