const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');


// get /api/jokes fetch all jokes
router.get('/jokes', jokeController.getAllJokes);

// get /api/jokes/random fetch random joke

router.get('/jokes/random', jokeController.getRandomJoke);

// get /api/jokes/:id fetch joke by id

router.get('/jokes/:id', jokeController.getJokeById);





// post /api/jokes/create create a new joke

router.post('/jokes/create', jokeController.createJoke);




module.exports = router;