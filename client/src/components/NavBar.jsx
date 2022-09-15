import React from "react";
import { Link } from "react-router-dom";
import {
  getAllVideogames  
} from "../action";
import { useDispatch, useSelector } from "react-redux";
import s from '../styles/NavBar.module.css'

export default function NavBar() {
  const dispatch = useDispatch();

  function onHandleClick(e) {
    e.preventDefault();
    dispatch(getAllVideogames());
  }
  return (
    <div>
      <div className={s.container}>
        <div className={s.title}>
         <h1>GAMING TODAY</h1>
        </div>
        <div className={s.buttons}>
          <Link to="/create">
            <button className={s.button}>Create videogame</button>
          </Link>
          <button
            onClick={(e) => {
              onHandleClick(e);
            }}
            className={s.button}
          >
            {" "}
            Return to all videogames{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
