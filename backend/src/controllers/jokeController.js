import { literal } from 'sequelize';
import Joke from '../models/Joke.js';

// this class will act as a @RestController in spring boot

class jokeController {
    

   // get all jokes

   async getAllJokes(req, res) {
         try {
            const jokes = await Joke.findAll();
            res.json({
                status: 'success',
                data: jokes, 
            });

         } catch (error) {
             res.status(500).json({
                 status: 'error',
                 message: error.message,
             });
         }
   }


   // get joke by id

   async getJokeById(req, res) {

    const jokeId = req.params.id;
    console.log("joke id recu : ",jokeId);
    

    try {
        const joke = await Joke.findByPk(jokeId);

        if (!joke) {
            res.status(404).json({
                status: 'error',
                message: 'Joke not found',
            });
            return;
        }

        res.json({
            status: 'success',
            data: joke,
        });


        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }


   }


   // get random joke
    async getRandomJoke(req, res) {

        try {
            const joke = await Joke.findOne({
                order: [
                    [literal('RANDOM()')],
                ],
            });

            res.json({
                status: 'success',
                data: joke,
            });

        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    }



 // create a new joke

    async createJoke(req, res) {
        try {
            const joke = await Joke.create({
                question: req.body.question,
                answer: req.body.answer,
                isUserCreated: true,
                countOfLikes: 0,

            });
    
            res.status(201).json({
                status: 'success',
                data: joke,
            });
    
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }

}


// delete joke by id


async deleteJokeById(req, res) {
    const jokeId = req.params.id;

    const jokeToDelete = await Joke.findByPk(jokeId);

    if (!jokeToDelete) {
        return res.status(404).json({
            status: 'error',
            message: 'Blague non trouvée',
        });
    }
    
    // check if joke have more than 10 likes    
    if (jokeToDelete.countOfLikes >= 10) {
        res.status(403).json({
            status: 'error',
            message: 'You cannot delete a joke with more than 10 likes',
        });
        return;
    }

    try{
        await Joke.destroy({
            where: {
                id: jokeId,
            },
        });

        // refresh the jokes list
        const jokes = await Joke.findAll();
        res.json({
            status: 'success',
            data: jokes,
        });

        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }



}

// like a joke

async likeJoke(req, res) {
    const jokeId = req.params.id;

    try {
        const joke = await Joke.findByPk(jokeId);

        if (!joke) {
            return res.status(404).json({
                status: 'error',
                message: 'Joke not found',
            });
        }

        // increment likes

        await joke.increment('countOfLikes');
        console.log("Incrémentation réussie pour la blague ID:", jokeId);

        


        // then reload the joke

        const updatedJoke = await joke.reload();
        console.log("Blague mise à jour :", updatedJoke.toJSON());

        // return updated joke 
         res.status(200).json({
             status: 'success',
             data: updatedJoke,
         });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });


}






}

}

export default new jokeController();