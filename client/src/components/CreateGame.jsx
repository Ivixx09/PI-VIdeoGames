import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getAllGenres, getAllPlatforms } from "../action/index";
import { useDispatch, useSelector } from "react-redux";
import s from "../styles/CreateGame.module.css";

function validate(input) {
  let errors = {};
  if (!input.name || input.name === "") errors.name = "Name is required.";
  if (input.description === "" || !input.description)
    errors.description = "Description is required.";
  if (!input.platforms.length) errors.platforms = "Platform is required.";
  if (
    !input.rating ||
    input.rating === "" ||
    input.rating > 5 ||
    input.rating < 1 ||
    (input.rating != 1 &&
      input.rating != 2 &&
      input.rating != 3 &&
      input.rating != 4 &&
      input.rating != 5)
  )
    errors.rating = "Rating is required with a value within 1 and 5.";

  const btn = document.getElementById('btn')
  btn.setAttribute('disabled', true)
  if(!Object.keys(errors).length) btn.removeAttribute('disabled')
  console.log(errors);
  return errors;
}

export default function CreateGame() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    rating: "",
    released: "",
    platforms: [],
    createdInDatabase: true,
    genres: [],
  });

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
    validate(input)
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    // console.log(errors);
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };
  const handleSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postGame(input));
    alert("Game created! :D");
    setInput({
      name: "",
      image: "",
      description: "",
      rating: "",
      released: "",
      platforms: [],
      createdInDatabase: true,
      genres: [],
    });

    history.push("/home");
  };

  const handleDeleteG = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((i) => i !== e),
    });
  };
  const handleDeleteP = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((i) => i !== e),
    });
  };

  return (
    <div className={s.container}>
      <div className={s.buttonContainer}>
        <Link to={"/home"}>
          <button className={s.button}>HOME</button>
        </Link>
      </div>
      <h1 className={s.title}> Create your game!</h1>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.divForm}>
          <div className={s.inputContainer}>
            <label>Name: </label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              className={s.input}
            />
            {errors.name && <p className={s.error}> {errors.name}</p>}
          </div>
          <div className={s.inputContainer}>
            <label>Image: </label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
              className={s.input}
            />
          </div>
          <div className={s.inputContainer}>
            <label>Description: </label>
            <input
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
              className={s.input}
            />
            {errors.description && <p className={s.error}> {errors.description}</p>}
          </div>
          <div className={s.inputContainer}>
            <label>Rating: </label>
            <input
              type="text"
              value={input.rating}
              name="rating"
              onChange={(e) => handleChange(e)}
              className={s.input}
            />
            {errors.rating && <p className={s.error}> {errors.rating}</p>}
          </div>
          <div className={s.inputContainer}>
            <label>Released: </label>
            <input
              type="date"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
              className={s.input}
              max="2022-09-15"
            />
            {errors.platforms && <p className={s.error}> {errors.platforms}</p>}
          </div>
          <div className={s.selectContainer}>
            <select className={s.select} onChange={(e) => handleSelect(e)}>
              <option> Gender </option>
              {genres?.map((g) => {
                return <option value={g}> {g} </option>;
              })}
            </select>
            <select
              className={s.select}
              onChange={(e) => handleSelectPlatforms(e)}
            >
              <option> Platforms </option>
              {platforms?.map((p) => {
                return <option value={p}> {p} </option>;
              })}
            </select>
          </div>
          <button type="submit" id="btn" className={s.button}>
            Create game
          </button>
        </div>
      </form>
      <ul>
        {input.genres.map((g) => {
          return (
            <div>
              <li>
                {g + ", "}
                <button onClick={() => handleDeleteG(g)}>x</button>
              </li>
            </div>
          );
        })}
      </ul>
      <ul>
        {input.platforms.map((p) => {
          return (
            <div>
              <li>
                {p + " "}
                <button onClick={() => handleDeleteP(p)}>x</button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
