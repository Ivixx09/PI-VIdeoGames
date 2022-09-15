const initialState = {
  videogames: [],
  genres: [],
  platforms: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };
    case "GET_VIDEOGAMES_CREATED":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_VIDEOGAMES_ALPHABET":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_VIDEOGAMES_RATING":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_VIDEOGAMES_GENDER":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_NAME_VIDEOGAME":
      return {
        ...state,
        videogames: action.payload,
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    case "GET_GAME_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
