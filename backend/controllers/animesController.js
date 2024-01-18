const express = require('express');
const animes = express.Router();
const { 
    getAllAnimes, 
    getOneAnime, 
    createOneAnime, 
    updateOneAnime,
    deleteOneAnime
} = require('../queries/animes')


function validateAnime(req, res, next) {
    const body = req.body

    if (!body.name || !body.description) {
        res.status(404).json({payload: "Please make sure you have AT LEAST a name AND description for your anime"})
    } 

    next()
}

// GET all of this resource
animes.get("/", async (_, res) => {
    try {
        const animes = await getAllAnimes()
        res.status(200).json({payload: animes})
    } catch (error) {
        res.status(404).json({payload: error})
    }

});




// GET one individual resource
animes.get('/:animeId', async (req, res) => {
    const { animeId } = req.params
    // console.log(`Here is the anime with an id of: ${id}`)

    try {
        // look for the anime the user has requested
        const anime = await getOneAnime(animeId)
        res.status(200).json({payload: anime})
    } catch (error) {
        res.status(404).json({payload: error})
    }


    // const anime = await getOneAnime(animeId)
    // if (anime) {
    //     res.status(200).json({payload: anime})
    // } else {
    //     res.status(404).json({payload: error})
    // }

    // res.send(JSON.stringify(`Here is the anime with id of ${id}`))
});

// CREATE or POST a new resource. At minimum we need name and description
animes.post('/new', async (req, res) => {
    const body = req.body 
    console.log(body)

    try {
        // some functionality to create a new anime
        const newAnime = await createOneAnime(body)
        res.status(201).json({payload: newAnime})
    } catch (error) {
        res.status(404).json({payload: error})
    }
});

// UPDATE an existing resource
animes.put('/:animeId', async (req, res) => {
    const { animeId } = req.params
    const body = req.body

    // console.log(`The anime with an id of: ${id}, has been updated with the information provided`)

    try {
        // some functionality to update an anime
        const updatedAnime = await updateOneAnime(animeId, body)
        res.status(200).json({payload: updatedAnime})
    } catch (error) {
        res.status(404).json({payload: error})
    }
});

// DELETE an individual resource
animes.delete('/:animeId', async (req, res) => {
    const { animeId } = req.params

    // console.log(`The anime with an ID of: ${id}, has been deleted`)

    try {
        // some functionality to delete an anime
        const deletedAnime = await deleteOneAnime(animeId)
        res.status(200).json({payload: deletedAnime})
    } catch (error) {
        res.status(404).json({payload: error})
    }
});

module.exports = animes;


const names = ["Jose", "Shaquala", "Yulonda"]
const lastPersonInArray = names.pop()
console.log(lastPersonInArray)
