const express = require("express");
const animes = express.Router();
const {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
} = require("../queries/animes");


// GET all of this resource
animes.get("/", async (_, res) => {
  try {
    const animes = await getAllAnimes();
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

/* Instructions: Use the following prompts to write the corresponding routes. **Each** route should be able to catch server-side and user input errors(should they apply). Consult the test files to see how the routes and errors should work.*/
//Write a GET route that retrieves all animes from the database and sends them to the client with a 200 status code

//Write a POST route that takes user provided data from the request body and creates a new anime in the database. The route should respond with a 201 status code and the new anime.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error

//Write a PUT route that takes user provided data from the request body and updates an existing anime in the database. The route should respond with a 200 and the updated anime. The route should be able to handle a non-existent anime id.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error

//Write a DELETE route that deletes a single anime by id (provided by the client as a request param) from the database and responds with a 200 and the deleted anime data. The route should be able to respond with a 404 error if passed a non-existent anime id.

module.exports = animes;


