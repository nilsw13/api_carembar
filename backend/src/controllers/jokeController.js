import Joke from '../models/Joke.js';
import { literal } from 'sequelize';  



// Récupération de toutes les blagues
export const getAllJokes = async (req, res) => {
    try {
        const jokes = await Joke.findAll();
        res.json({
            status: 'success',
            data: jokes
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Récupération d'une blague aléatoire
export const getRandomJoke = async (req, res) => {
    try {
        const joke = await Joke.findOne({
            order: [
                [literal('RANDOM()')]
            ]
        });

        res.json({
            status: 'success',
            data: joke
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Récupération d'une blague par son ID
export const getJokeById = async (req, res) => {
    const jokeId = req.params.id;
    console.log("joke id recu : ", jokeId);

    try {
        
        const joke = await Joke.findByPk(jokeId);

        if (!joke) {
            return res.status(404).json({
                status: 'error',
                message: 'Joke not found'
            });
        }

        res.json({
            status: 'success',
            data: joke
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Création d'une blague

export const createJoke = async (req, res) => {
    try {
        const joke = await Joke.create({
            question: req.body.question,
            answer: req.body.answer,
            isUserCreated: true,
            countOfLikes: 0 
        });

        res.status(201).json({
            status: 'success',
            data: joke
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Suppression d'une blague par son ID
export const deleteJokeById = async (req, res) => {
    const jokeId = req.params.id;

    try {
        const jokeToDelete = await Joke.findByPk(jokeId);

        if (!jokeToDelete) {
            return res.status(404).json({
                status: 'error',
                message: 'Blague non trouvée'
            });
        }

       
        if (jokeToDelete.countOfLikes >= 10) {
            return res.status(403).json({
                status: 'error',
                message: 'You cannot delete a joke with more than 10 likes'
            });
        }

        await Joke.destroy({
            where: { id: jokeId }
        });

        const jokes = await Joke.findAll();
        res.json({
            status: 'success',
            data: jokes
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


// Incrémentation du nombre de likes d'une blague
export const likeJoke = async (req, res) => {
    const jokeId = req.params.id;

    try {
        const joke = await Joke.findByPk(jokeId);

        if (!joke) {
            return res.status(404).json({
                status: 'error',
                message: 'Joke not found'
            });
        }

        await joke.increment('countOfLikes');
        console.log("Incrémentation réussie pour la blague ID:", jokeId);

        const updatedJoke = await joke.reload();
        console.log("Blague mise à jour :", updatedJoke.toJSON());

        res.status(200).json({
            status: 'success',
            data: updatedJoke
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};