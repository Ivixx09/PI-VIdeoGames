import axios from "axios";

export function getAllVideogames() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getAllPlatforms() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/platforms");
    return dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data.map((g) => g.name),
    });
  };
}

export function getCreatedGamesOrNot(evento) {
  return async function (dispatch) {
    if (evento === "vCreated") {
      const json = await axios.get("http://localhost:3001/gamesCreated");
      return dispatch({
        type: "GET_VIDEOGAMES_CREATED",
        payload: json.data,
      });
    } else {
      const json = await axios.get("http://localhost:3001/gamesExisting");
      return dispatch({
        type: "GET_VIDEOGAMES_CREATED",
        payload: json.data,
      });
    }
  };
}
export function getGamesByAlphabet(evento) {
  return async function (dispatch) {
    if (evento === "asc") {
      const json = await axios.get("http://localhost:3001/gamesAsc");
      return dispatch({
        type: "GET_VIDEOGAMES_ALPHABET",
        payload: json.data,
      });
    } else {
      const json = await axios.get("http://localhost:3001/gamesDesc");
      return dispatch({
        type: "GET_VIDEOGAMES_ALPHABET",
        payload: json.data,
      });
    }
  };
}
export function getGamesByRating(evento) {
  return async function (dispatch) {
    if (evento === "Asc") {
      const json = await axios.get("http://localhost:3001/ratingAsc");
      return dispatch({
        type: "GET_VIDEOGAMES_RATING",
        payload: json.data,
      });
    } else {
      const json = await axios.get("http://localhost:3001/ratingDesc");
      return dispatch({
        type: "GET_VIDEOGAMES_RATING",
        payload: json.data,
      });
    }
  };
}
export function getGamesByGender(evento) {
  return async function (dispatch) {
    const json = await axios.get(
      `http://localhost:3001/gamesByGender?genre=${evento}`
    );
    return dispatch({
      type: "GET_VIDEOGAMES_GENDER",
      payload: json.data,
    });
  };
}

export function getNameVideogame(evento) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/videogames?name=${evento}`)
      .then((r) => {
        return dispatch({
          type: "GET_NAME_VIDEOGAME",
          payload: r.data,
        });
      })
      .catch((e) => console.log(e.message));
  };
}

export function postGame(payload) {
  return async function (dispatch) {
    payload.platforms = payload.platforms.toString();
    console.log(payload);
    const json = await axios.post(`http://localhost:3001/videogames`, payload);
    return json;
  };
}

export function gameDetail(id) {
  return async function (dispatch) {
    const { data } = await axios.get(`http://localhost:3001/videogame/${id}`);
    return dispatch({
      type: "GET_GAME_DETAIL",
      payload: data,
    });
  };
}
