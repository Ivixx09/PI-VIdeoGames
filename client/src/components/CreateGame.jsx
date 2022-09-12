import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getAllGenres, getAllPlatforms } from "../action/index";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!input.image) {
    errors.image = "image is required";
  } else if (!input.description) {
    errors.description = "description is required";
  } else if (!input.rating) {
    errors.rating = "rating is required";
  } else if (!input.released) {
    errors.released = "released is required";
  }

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
    <div>
      <Link to={"/home"}>
        <button>HOME</button>
      </Link>
      <h1> Create your game!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (<p> {errors.name}</p>)}
        </div>
        <div>
          <label>image: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (<p> {errors.image}</p>)}
        </div>
        <div>
          <label>description: </label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p> {errors.description}</p>}
        </div>
        <div>
          <label>rating: </label>
          <input
            type="text"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p> {errors.rating}</p>}
        </div>
        <div>
          <label>released: </label>
          <input
            type="text"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p> {errors.released}</p>}
        </div>
        <select onChange={(e) => handleSelect(e)}>
          <option> Gender </option>
          {genres?.map((g) => {
            return <option value={g}> {g} </option>;
          })}
        </select>
        <select onChange={(e) => handleSelectPlatforms(e)}>
          <option> platforms </option>
          {platforms?.map((p) => {
            return <option value={p}> {p} </option>;
          })}
        </select>
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
        <button type="submit"> Create game </button>
      </form>
    </div>
  );
}
