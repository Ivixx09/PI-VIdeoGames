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
import Card from "./Card";
import Paginado from "./Pagin";
import SearchBar from "./SearchBar";
import s from "../styles/Home.module.css";
import NavBar from "./NavBar";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamePerPage, setVideogamePerPage] = useState(15);
  const lastVideogame = videogamePerPage * currentPage;
  const firstVideogame = lastVideogame - videogamePerPage;
  const currentsVideogames = allGames.slice(firstVideogame, lastVideogame);

  const allGenres = useSelector((state) => state.genres);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenres());
  }, [dispatch]);

  function onClickCreated(e) {
    e.preventDefault();
    const evento = e.target.value;
    setCurrentPage(1);
    if(e.target.value === 'Api') {return;}
    else {
      dispatch(getCreatedGamesOrNot(evento));
      document.getElementById('api').selectedIndex = 0;
    }
  }
  function onClickName(e) {
    e.preventDefault();
    const evento = e.target.value;
    if(e.target.value === 'Name') {return;}
    else {
      dispatch(getGamesByAlphabet(evento));
      document.getElementById('name').selectedIndex = 0;
    }
  }
  function onClickRate(e) {
    e.preventDefault();
    const evento = e.target.value;
    if(e.target.value === 'Rating') {return;}
    else {
      dispatch(getGamesByRating(evento));
      document.getElementById('rating').selectedIndex = 0;
    }
  }
  function onClickGender(e) {
    e.preventDefault();
    const evento = e.target.value;
    setCurrentPage(1);
    if(e.target.value === 'Gender') {return;}
    else {
      dispatch(getGamesByGender(evento));
      document.getElementById('Gender').selectedIndex = 0;
    }
  }

  return (
    <div className={s.container}>
      <NavBar />
      <div className={s.filtersContainer}>
        <select
          onChange={(e) => {
            onClickRate(e);
          }}
          className={s.select}
          id="rating"
        >
          <option defaultValue="rating"> Rating </option>
          <option value="Asc"> Ascendent </option>
          <option value="Desc"> Descendent </option>
        </select>
        <select
          onChange={(e) => {
            onClickName(e);
          }}
          className={s.select}
          id="name"
        >
          <option defaultValue={"Name"}> Name </option>
          <option value="asc"> Ascendent </option>
          <option value="desc"> Descendent </option>
        </select>
        <select
          onChange={(e) => {
            onClickCreated(e);
          }}
          className={s.select}
          id="api"
        >
          <option defaultValue={"Api"}>
            Api
          </option>
          <option value="vCreated"> Videogames created </option>
          <option value="vOriginals"> Videogames originals </option>
        </select>
        <select
          onChange={(e) => {
            onClickGender(e);
          }}
          className={s.select}
          id="Gender"
        >
          <option defaultValue="Gender"> Gender </option>
          {allGenres?.map((g) => {
            return <option value={g}> {g} </option>;
          })}
        </select>
      </div>
        <Paginado
          videogamePerPage={videogamePerPage}
          allGames={allGames.length}
          paginado={paginado}
        />
        <SearchBar />
        <div className={s.cardsContainer}>
          {currentsVideogames?.map((v) => {
            return (
              <div key={v.id}>
                <Card
                  name={v.name}
                  image={v.image}
                  genre={v.genres.map((n) => n.name)}
                  id={v.id}
                />
              </div>
            );
          })} 
        </div>
      </div>
  );
}
// genre={g.genres.map( n => n.name.toString())}
// solucionar: mejorar el back, no llama desde la Db, constrolar por fomulario de js, aplicar css
