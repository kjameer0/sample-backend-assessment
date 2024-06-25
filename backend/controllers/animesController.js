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
    res.status(200).json(animes);
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});

// CREATE or POST a new resource. At minimum we need name and description
animes.post("/new", async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    // some functionality to create a new anime
    const newAnime = await createOneAnime(body);
    res.status(201).json({ payload: newAnime });
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});
animes.post("/", async (req, res) => {
  const body = req.body;
  try {
    const newAnimeRecord = await createOneAnime(body);
    res.status(201).json(newAnimeRecord);
  } catch (error) {
    res.json({ error: "failed to post" });
  }
});

// UPDATE an existing resource
animes.put("/:animeId", async (req, res) => {
  const { animeId } = req.params;
  const body = req.body;

  // console.log(`The anime with an id of: ${id}, has been updated with the information provided`)

  try {
    // some functionality to update an anime
    const updatedAnime = await updateOneAnime(animeId, body);
    res.status(200).json({ payload: updatedAnime });
  } catch (error) {
    res.status(404).json({ payload: error });
  }
});

// DELETE an individual resource
animes.delete("/:animeId", async (req, res) => {
  const { animeId } = req.params;

  // console.log(`The anime with an ID of: ${id}, has been deleted`)

  try {
    // some functionality to delete an anime
    const deletedAnime = await deleteOneAnime(animeId);
    res.status(200).json({ payload: deletedAnime });
  } catch (error) {
    res.status(404).json({ payload: error });
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
