import React from "react";
import s from '../styles/Pagin.module.css'

export default function Paginado({ videogamePerPage, allGames, paginado }) {
  const pageNumber = [];
  for (let i = 0; i <= Math.ceil(allGames / videogamePerPage) - 1; i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav className={s.navContainer}>
      <ul className={s.ulContainer}>
        {pageNumber &&
          pageNumber.map((number) => (
            <li className={s.li} key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
