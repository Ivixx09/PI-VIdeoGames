require("dotenv").config();
const { Router } = require("express");
const {
  filterByGamesCreated,
  filterByGamesExistents,
  filterByGenres,
  gamesAsc,
  gamesDesc,
  ratingDesc,
  ratingAsc,
  getAllPLatforms,
} = require("./controllers");
const router = Router();
const { Videogame, Genres } = require("../db");
// router.use(express.json());
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get("/videogames", async (req, res) => {
  try {
    const { name } = req.query;
    let allV = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        throught: {
          attributes: [],
        },
      },
    });
    if (name) {
      let vG = allV.filter((g) => {
        if (g !== undefined && g.name.toLowerCase() === name.toLowerCase()) {
          return g.name;
        }
      });
      vG.length
        ? res.status(200).send(vG)
        : res.status(404).send("videogame Not found");
    } else {
      res.status(200).send(allV);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/videogame/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("Es requerido un id");
    } else {
      const allGames = await Videogame.findAll();
      let game;
      allGames.forEach((g) => {
        if (g.dataValues.id === id) {
          game = g.dataValues;
        }
      });
      game
        ? res.status(200).send(game)
        : res.status(404).send("Juego no encontrado.");
    }
  } catch (e) {
    console.log(e.message);
  }
});
router.post("/videogames", async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      released,
      rating,
      genres,
      platforms,
      createdInDb,
    } = req.body;
    if (
      !name ||
      !description ||
      !rating ||
      !genres ||
      !platforms
    ) {
      return res.status(400).json("faltan datos");
    } else {
      const gameCreated = await Videogame.create({
        name,
        image,
        description,
        rating,
        released,
        platforms,
        createdInDatabase: true,
      });
      let genreDB = await Genres.findAll({
        where: { name: genres },
      });
      gameCreated.addGenre(genreDB);
      res.status(200).send("Videojuego creado exitosamente.");
    }
  } catch (e) {
    console.log(e.message);
  }
});
router.get("/genres", async (req, res) => {
  try {
    const genresDB = await Genres.findAll();
    res.status(200).send(genresDB);
  } catch (e) {
    console.log(e.message);
  }
});
router.get("/gamesCreated", filterByGamesCreated);
router.get("/gamesExisting", filterByGamesExistents);
router.get("/gamesByGender", filterByGenres);
router.get("/gamesAsc", gamesAsc);
router.get("/gamesDesc", gamesDesc);
router.get("/ratingAsc", ratingAsc);
router.get("/ratingDesc", ratingDesc);
router.get("/platforms", getAllPLatforms);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
