import React from "react";
import s from "../styles/Card.module.css";
import { Link } from "react-router-dom";
export default function Card({ name, image, genre, id }) {
  return (
    <div className="card">
    <h2 className={s.name}>{name}</h2>
    <h3 className={s.genre}>{genre.join("-")}</h3>
    <div className="card2">
<Link to={"/detail/" + id} className={s.link}>
    <img src={image} alt="game" className={s.imagen}/>
</Link> 
    </div>
  </div>
  );
}



