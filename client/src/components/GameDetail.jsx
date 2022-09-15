import React from "react";
import { Link } from "react-router-dom";
import { gameDetail } from "../action/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import s from "../styles/GameDetail.module.css";

export function GameDetail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gameDetail(props.match.params.id));
    // console.log(props.match.params.id)
  }, [dispatch]);

  const myGame = useSelector((state) => state.detail);

  return (
    <div className={s.container}>
      {myGame ? (
        <div>
          <h1>{myGame.name}</h1>
          <div className={s.divGrid}>
            <div className={s.imgContainer}>
              <img src={myGame.image} alt="Pic not found or broken :(" />
            </div>
            <div>
              <h6>RELEASED: {myGame.released}</h6>
              <h6>RATING: {myGame.rating}</h6>
              <h6>PLATFORMS: {myGame.platforms}</h6>
              <p>{myGame.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
      <Link to="/home">
        <button> BACK </button>
      </Link>
    </div>
  );
}
