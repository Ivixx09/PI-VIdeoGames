import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getAllGenres,
  getCreatedGamesOrNot,
  getGamesByAlphabet,
  getGamesByRating,
  getGamesByGender,
} from "../action";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Pagin";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamePerPage, setVideogamePerPage] = useState(15);
  const lastVideogame = videogamePerPage * currentPage;
  const firstVideogame = lastVideogame - videogamePerPage;
  const currentsVideogames = allGames.slice(firstVideogame, lastVideogame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenres());
  }, [dispatch]);

  function onHandleClick(e) {
    e.preventDefault();
    dispatch(getAllVideogames());
  }
  function onClickCreated(e) {
    e.preventDefault();
    const evento = e.target.value;
    dispatch(getCreatedGamesOrNot(evento));
  }
  function onClickName(e) {
    e.preventDefault();
    const evento = e.target.value;
    dispatch(getGamesByAlphabet(evento));
  }
  function onClickRate(e) {
    e.preventDefault();
    const evento = e.target.value;
    dispatch(getGamesByRating(evento));
  }

  function onClickGender(e) {
    e.preventDefault();
    const evento = e.target.value;
    dispatch(getGamesByGender(evento));
  }

  return (
    <div>
      <Link to="/create">
        <button>Create videogame</button>
      </Link>
      <h1>GAMING TODAY</h1>
      <button
        onClick={(e) => {
          onHandleClick(e);
        }}
      >
        {" "}
        Return to all videogames{" "}
      </button>
      <div>
        <select
          defaultValue={"Rating"}
          onChange={(e) => {
            onClickRate(e);
          }}
        >
          <option> Rating </option>
          <option value="Asc"> Ascendent </option>
          <option value="Desc"> Descendent </option>
        </select>
        <select
          onChange={(e) => {
            onClickName(e);
          }}
        >
          <option defaultValue={"Name"}> Name </option>
          <option value="asc"> Ascendent </option>
          <option value="desc"> Descendent </option>
        </select>
        <select
          onChange={(e) => {
            onClickCreated(e);
          }}
        >
          <option selected disabled >Api</option>
          <option value="vCreated"> Videogames created </option>
          <option value="vOriginals"> Videogames originals </option>
        </select>
        <select
          onChange={(e) => {
            onClickGender(e);
          }}
        >
          <option> Gender </option>
          {allGenres?.map((g) => {
            return <option value={g}> {g} </option>;
          })}
        </select>
        <Paginado
          videogamePerPage={videogamePerPage}
          allGames={allGames.length}
          paginado={paginado}
        />
        <SearchBar />
        {currentsVideogames?.map((v) => {
          return (
            <div key={v.id}>
              <Link to={"/detail/" + v.id}>
                <Card
                  name={v.name}
                  image={v.image}
                  genre={v.genres.map((n) => n.name)}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// genre={g.genres.map( n => n.name.toString())}
// solucionar: mejorar el back, no llama desde la Db, constrolar por fomulario de js, aplicar css
