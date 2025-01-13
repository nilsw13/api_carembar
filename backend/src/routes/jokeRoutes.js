import express from 'express';
import {
    getAllJokes,
    getRandomJoke,
    getJokeById,
    deleteJokeById,
    likeJoke,
    createJoke
} from '../controllers/jokeController.js';  

const router = express.Router();


router.get('/jokes', getAllJokes);
router.get('/jokes/random', getRandomJoke);
router.get('/jokes/:id', getJokeById);
router.delete('/jokes/delete/:id', deleteJokeById);
router.post('/jokes/:id/like', likeJoke);
router.post('/jokes/create', createJoke);


export default router;