// DEPENDENCIES
const express = require('express');
const cors = require('cors')
const animesController = require('./controllers/animesController');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// ROUTES
app.use('/animes', animesController)

app.get("/", (_, res) => {
    res.send("Welcome to Animania!")
});


app.get("*", (_, res) => {
    res.status(404).send("The request you are looking for doesnt exist!")
})



// EXPORT
module.exports = app;