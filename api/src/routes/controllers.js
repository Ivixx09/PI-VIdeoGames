const API_KEY = process.env.ApiKey_Games;
const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");

const getApiInfo = async () => {
  let pageIndex = 1;
  var prevGames = [];
  while (pageIndex <= 5) {
    const apiUrl = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${pageIndex}`
    );

    apiUrl.data.results.map((g) => {
      if (!prevGames.includes(g.name)) {
        let videogames = {
          name: g.name,
          id: g.id,
          image: g.background_image,
          genres: g.genres,
          rating: g.rating,
          released: g.released,
          platforms: g.platforms,
        };
        prevGames = prevGames.concat(videogames);
      }
    });
    pageIndex++;
  }
  return prevGames;
};
const getAllPLatforms = async (req, res) => {
  try {
    const apiInfo = await getApiInfo();
    let platforms = [];
    apiInfo.forEach((e) => {
      e.platforms?.forEach((p) => {
        if (!platforms.includes(p.platform.name))
          platforms.push(p.platform.name);
      });
    });
    res.status(200).send(platforms);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getDbInfo = async () => {
  await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
};

const getGenres = async () => {
  const allGenres = await axios.get(
    "https://api.rawg.io/api/genres?key=73264c9808854f24b1a14ce4d77a36d3"
  );
  const genresMapped = allGenres.data.results.map((g) => g.name);
  return genresMapped;
};

const videoGamesToDb = async () => {
  try {
    const description = [];
    const apiInfo = await getApiInfo();
    for (const i of apiInfo) {
      const r = await axios.get(`https://api.rawg.io/api/games/${i.id}?key=${API_KEY}`)
      description.push({
        id: r.data.id,
        description: r.data.description
      })
    }
    apiInfo.forEach( (g) => {
      description.forEach( d => {
        if(d.id === g.id ){
          g.description = d.description.replace(/(<([^>]+)>)/gi,"")
        }
      } )
    })
    const gamaesDb = await Videogame.findAll();
    if (gamaesDb.length) {
      return;
    }
    apiInfo.forEach(async (g) => {
      const generos = g.genres.map((G) => G.name);
      // const generosToString = generos.toString()
      let plataformas = g.platforms.map((G) => G.platform.name);
      let plataformsToString = plataformas.toString();
      const imagen = g.image.toString();
      const game = await Videogame.create({
        name: g.name,
        image: imagen,
        description: g.description,
        rating: Number(g.rating),
        released: g.released,
        platforms: plataformsToString,
      });
      generos.forEach(async (g) => {
        const genre = await Genres.findOne({
          where: {
            name: g,
          },
        });
        await game.addGenre(genre);
      });
    });
  } catch (e) {
    console.log(e.message);
  }
};
const genresToDb = async () => {
  try {
    const allGenres = await getGenres();
    allGenres.forEach((gen) => {
      Genres.findOrCreate({
        where: { name: gen },
      });
    });
  } catch (e) {
    console.log(e.message);
  }
};

const getAllGame = async () => {
  const apiInfo = await getApiInfo();

  return apiInfo;
};

// FIIIIIIIIIIIIIIIIIIIIIIILLLLLLLLLLTTTTTTTTRRRRRRRRRAAAAAAADDDDDDDDDDOOOOOOOOOOSSSSSSSS

const filterByGamesCreated = async (req, res) => {
  try {
    const getAllGamesDb = await Videogame.findAll({
      where: {
        createdInDatabase: {
          [Op.is]: true,
        },
      },
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          atributes: [],
        },
      },
    });
    getAllGamesDb
      ? res.status(200).send(getAllGamesDb)
      : res.status(400).send("No se encontraron juegos creados.");
  } catch (e) {
    console.log(e.message);
  }
};
const filterByGamesExistents = async (req, res) => {
  try {
    const getAllGamesDb = await Videogame.findAll({
      where: {
        createdInDatabase: {
          [Op.is]: false,
        },
      },
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          atributes: [],
        },
      },
    });
    getAllGamesDb
      ? res.status(200).send(getAllGamesDb)
      : res.status(400).send("No se encontraron juegos creados.");
  } catch (e) {
    console.log(e.message);
  }
};
const filterByGenres = async (req, res) => {
  const { genre } = req.query;
  const gamesByGenre = await Videogame.findAll({
    include: {
      model: Genres,
      as: "genres",
      where: {
        name: { [Op.eq]: genre },
      },
    },
    // where: {
    //   "$genres.name$": { [Op.eq]: genre },
    // },
    // include: [
    //   {
    //     model: Genres,
    //     as: "genres",
    //   },
    //   {},
    // ],
  });
  gamesByGenre
    ? res.status(200).send(gamesByGenre)
    : res.status(400).send("No se encontraron juegos creados.");
};
const gamesAsc = async (req, res) => {
  const aToZ = await Videogame.findAll({
    order: [["name", "ASC"]],
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
  aToZ
    ? res.status(200).send(aToZ)
    : res.status(400).send("No se encontraron juegos creados.");
};
const gamesDesc = async (req, res) => {
  const zToA = await Videogame.findAll({
    order: [["name", "DESC"]],
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
  zToA
    ? res.status(200).send(zToA)
    : res.status(400).send("No se encontraron juegos creados.");
};
const ratingDesc = async (req, res) => {
  const ratingDesc = await Videogame.findAll({
    order: [["rating", "DESC"]],
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
  ratingDesc
    ? res.status(200).send(ratingDesc)
    : res.status(400).send("No se encontraron juegos creados.");
};
const ratingAsc = async (req, res) => {
  const ratingAsc = await Videogame.findAll({
    order: [["rating", "ASC"]],
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
  ratingAsc
    ? res.status(200).send(ratingAsc)
    : res.status(400).send("No se encontraron juegos creados.");
};
module.exports = {
  getAllGame,
  getGenres,
  genresToDb,
  videoGamesToDb,
  filterByGamesCreated,
  filterByGamesExistents,
  filterByGenres,
  gamesAsc,
  gamesDesc,
  ratingDesc,
  ratingAsc,
  getAllPLatforms,
};

// create, put, delete
