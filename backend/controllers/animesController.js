const express = require("express");
const animes = express.Router();
const {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
} = require("../queries/animes");

function validateAnime(req, res, next) {
  const body = req.body;

  if (!body.name || !body.description) {
    res.status(404).json({
      payload:
        "Please make sure you have AT LEAST a name AND description for your anime",
    });
  }

  next();
}

// GET all of this resource
animes.get("/", async (_, res) => {
  try {
    const animes = await getAllAnimes();
    console.log("hidsh");
    res.status(200).json(animes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE or POST a new resource. At minimum we need name and description
animes.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      throw new Error("Invalid user input");
    }
    const newAnimeRecord = await createOneAnime(name, description);
    res.status(201).json(newAnimeRecord);
  } catch (error) {
    console.error(error);
    if (error.message === "Invalid user input") {
      res.status(400).json({ error: "Invalid user input" });
    } else {
      res.status(500).json({ error: "Failed to create new anime." });
    }
  }
});

// UPDATE an existing resource
animes.put("/:animeId", async (req, res) => {
  const { animeId } = req.params;
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      throw new Error("Invalid user input");
    }
    const animeFromDb = await getOneAnime(animeId);
    if (!animeFromDb) {
      return res
        .status(404)
        .json({ error: "No such anime with the provided id exists" });
    }
    const updatedAnime = await updateOneAnime(animeId, req.body);
    res.status(200).json(updatedAnime);
  } catch (error) {
    console.error(error);
    if (error.message === "Invalid user input") {
      res.status(400).json({ error: "Invalid user input" });
    } else {
      res.status(500).json({ error: "Failed to update anime." });
    }
  }
});

// DELETE an individual resource
animes.delete("/:animeId", async (req, res) => {
  const { animeId } = req.params;
  try {
    const animeFromDb = await getOneAnime(animeId);
    if (!animeFromDb) {
      return res
        .status(404)
        .json({ error: "No such anime with the provided id exists" });
    }
    const deletedAnime = await deleteOneAnime(animeId);
    res.status(200).json(deletedAnime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Write a GET route that retrieves all animes from the database and sends them to the client
//Write a GET route that retrieves a single anime by id (provided by the client as a request param) from the database and sends them to the client
//Write a POST route that takes user provided data from the request body and creates a new anime in the database
//Write a PUT route that takes user provided data from the request body and updates an existing anime in the database
//Write a DELETE route that deletes a single anime by id (provided by the client as a request param) from the database and responds with a 200 and the deleted anime data

module.exports = animes;

/* Instructions: There are several comments in this file that describe routes you need to write to pass this assessment's test cases. After you have fully set up the project, you should be able to run the npm run test command to run all of the available tests. They should fail at first.
Read the tests to figure out how the routes should be structured. You can check out /queries/animes.js to import utilities to interact with the database. It's your job to determine how and when to use the provided functions. */

//Write a GET route / that responds with a list of all of the animes in the database and a 200 status code.

//Write a POST route / that reads the body of the request and adds a new anime to the database with the provided name and description. It should respond with the newly created anime and a status code of 201.
//The name and description should both be strings with length greater than 0.
//The route should respond with an error saying "Invalid input for anime creation" if these conditions are not met.

//Write a PUT route /:animeId that reads the body of the request and updates the anime in the database with the id provided by the request parameters. It should respond with the updated anime and a status code of 200
//The name and description should both be strings with length greater than 0.
//The route should respond with an error saying "Invalid input for anime update" if these conditions are not met.

// Write a DELETE route /:animeId that deletes the anime in the database with an id matching the id from the request parameters. If successful, the route should respond with a status code of 200 and the deleted record. The route should respond with an error saying "This record does not exist" if there is no record with that id in the database.
