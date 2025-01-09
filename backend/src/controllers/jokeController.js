const Joke = require('../models/Joke');

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
                    [Sequelize.fn('RANDOM')],
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

}

module.exports = new jokeController();