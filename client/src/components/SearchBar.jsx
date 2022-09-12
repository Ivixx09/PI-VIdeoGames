import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../action/index.js";

export default function SearchBar(e) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log("Valor pasado: ", e.target.value)
    console.log("Valor del name: ", name)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getNameVideogame(name))
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar personaje"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}> Buscar </button>
    </div>
  );
}
