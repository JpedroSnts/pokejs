import { useState, useRef, useEffect } from "react";
import styles from "../styles/Navbar.module.css";

type NavbarProps = {
  restartLoad: (cGen: number) => void;
  search: (txtSearch: string) => void;
  currentGeneration: number;
};
function Navbar({ restartLoad, search, currentGeneration }: NavbarProps) {
  const selectGen = useRef(document.createElement("select"));
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    selectGen.current.selectedIndex = currentGeneration - 1;
  }, [currentGeneration]);

  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarContent}>
        <img
          src={`${process.env.PUBLIC_URL}/img/pokejs.png`}
          alt="logo-pokejs"
          className={styles.Logo}
        />
        <div className={styles.Search}>
          <form>
            <label htmlFor="txt_search">Search</label>
            <input
              type="text"
              placeholder="Buscar por nome ou número"
              id="txt_search"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (textSearch !== "") {
                  search(textSearch);
                  setTextSearch("");
                }
              }}
            >
              Buscar <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className={styles.SelectGeneration}>
          <label htmlFor="generations">Geração</label>
          <select
            name="generations"
            id="generations"
            ref={selectGen}
            onChange={() => restartLoad(parseInt(selectGen.current.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
