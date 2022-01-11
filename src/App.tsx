import { useEffect, useState } from "react";
import "./styles/Globals.css";

// Types
import { Ipokemon } from "./types";

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

  function restartLoad(cGen: number) {
    setPokemons([]);
    setAmountLoad(20);
    setTypeLoad("AUTO");
    setCurrentGeneration(cGen);
  }

  function search(txtSearch: string) {
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
    async function load(typeLoad: string) {
      if (typeLoad === "AUTO") {
        const result: Ipokemon[] = await loadPokemons(
          currentGeneration,
          amountLoad,
        );
        setPokemons(result as never);
      } else if (typeLoad === "SUBMIT") {
        const pkmn404: Ipokemon = {
          id: 404,
          name: "Not Found",
          generation: 404,
          types: ["Error 404"],
          image: `${process.env.PUBLIC_URL}/img/404_pokemon.png`,
        };
        setPokemons([]);
        const result = await searchPokemon(textSearch, setCurrentGeneration);
        if (!result) {
          setPokemons([pkmn404] as never);
        } else {
          setPokemons(result as never);
        }
      }
    }
    load(typeLoad);
  }, [currentGeneration, typeLoad, textSearch, amountLoad]);

  useEffect(() => {
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
    const IO = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (
          amountLoad + generations[currentGeneration - 1].initial <
          generations[currentGeneration - 1].final
        )
          setAmountLoad((amountLoad) => amountLoad + 20);
      }
    });
    const div = document.getElementById("loadMore");
    div !== null && IO.observe(div);

    return () => IO.disconnect();
  }, [amountLoad, currentGeneration]);

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
          {pokemons.map((pokemon: Ipokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              generation={pokemon.generation}
              name={pokemon.name}
              types={pokemon.types}
              image={pokemon.image}
            />
          ))}
        </Container>
        <div id="loadMore" />
        <NavToTop />
      </section>
    </>
  );
}

export default App;
