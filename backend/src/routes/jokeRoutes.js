const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');


// get /api/jokes fetch all jokes
router.get('/jokes', jokeController.getAllJokes);

// get /api/jokes/random fetch random joke

router.get('/jokes/random', jokeController.getRandomJoke); // error on random fetch lets see later 

// get /api/jokes/:id fetch joke by id

router.get('/jokes/:id', jokeController.getJokeById);

// delete /api/jokes/delete/:id delete joke by id

router.delete('/jokes/delete/:id', jokeController.deleteJokeById);

// post /api/jokes/like/:id like a joke

router.post('/jokes/:id/like', jokeController.likeJoke);





// post /api/jokes/create create a new joke

router.post('/jokes/create', jokeController.createJoke);




module.exports = router;