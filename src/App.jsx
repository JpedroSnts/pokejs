import React, { useEffect, useState } from "react";
import "./styles/Globals.css";

//Components
import Navbar from "./components/Navbar";
import NavToTop from "./components/NavToTop";
import Container from "./components/Container";
import Card from "./components/Card";
import searchPokemon from "./api/search";
import loadPokemons from "./api/pokemons";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [typeLoad, setTypeLoad] = useState("AUTO");
  const [textSearch, setTextSearch] = useState("");
  const [currentGeneration, setCurrentGeneration] = useState(1);
  const [amountLoad, setAmountLoad] = useState(20);
  const generations = [
    { initial: 1, final: 151 },
    { initial: 152, final: 251 },
    { initial: 252, final: 386 },
    { initial: 386, final: 493 },
    { initial: 494, final: 649 },
    { initial: 650, final: 721 },
    { initial: 722, final: 809 },
    { initial: 810, final: 898 },
  ];

  function restartLoad(cGen) {
    setPokemons([]);
    setAmountLoad(20);
    setTypeLoad("AUTO");
    setCurrentGeneration(cGen);
  }

  function search(txtSearch) {
    setTextSearch(txtSearch.toLowerCase());
    setAmountLoad(20);
    setTypeLoad("SUBMIT");
  }

  function restoreLoad() {
    setTypeLoad("AUTO");
    setAmountLoad(20);
    setCurrentGeneration(1);
    setTextSearch("");
  }

  useEffect(() => {
    async function load(typeLoad) {
      if (typeLoad === "AUTO") {
        const result = await loadPokemons(currentGeneration, amountLoad);
        setPokemons(result);
      } else if (typeLoad === "SUBMIT") {
        const pkmn404 = {
          id: 404,
          name: "Not Found",
          types: ["Error 404"],
          image: `${process.env.PUBLIC_URL}/img/404_pokemon.png`,
        };
        setPokemons([]);
        const result = await searchPokemon(textSearch, setCurrentGeneration);
        if (!result) {
          setPokemons([pkmn404]);
        } else {
          setPokemons(result);
        }
      }
    }
    load(typeLoad);
  }, [currentGeneration, typeLoad, textSearch, amountLoad]);

  return (
    <>
      <header>
        <Navbar
          restartLoad={restartLoad}
          search={search}
          currentGeneration={currentGeneration}
        />
      </header>
      <section>
        {typeLoad === "SUBMIT" ||
        textSearch !== "" ||
        currentGeneration !== 1 ? (
          <button onClick={restoreLoad} className="btnLimpar">
            Limpar
          </button>
        ) : (
          ""
        )}

        <Container>
          {pokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              title={pokemon.name}
              types={pokemon.types}
              image={pokemon.image}
            />
          ))}
        </Container>
        {amountLoad + generations[currentGeneration - 1].initial >=
          generations[currentGeneration - 1].final || typeLoad === "SUBMIT" ? (
          ""
        ) : (
          <button
            onClick={() => setAmountLoad(amountLoad + 20)}
            className="loadMore"
          >
            Carregar Mais
          </button>
        )}
        <NavToTop />
      </section>
    </>
  );
}

export default App;
