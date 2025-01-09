const express = require('express');
const sequelize = require('./config/database');
const jokesRoutes = require('./routes/jokeRoutes');


// create express app ( similar to @springbootapplication)

const app = express();

app.use(express.json());

// add global prefix to all routes
app.use("/api", jokesRoutes)

// test routes to see if the server is running at / 
    app.get('/', (req, res) => {
        res.json({
            message : "Bienvenu sur l'api Carambar Jokes !",
            version : "1.0.0", 
            author : "Nils Wenting",
            endpoints: {
                getJokes: "/api/jokes",
                getJokeByID: "/api/jokes/:id",
                addJoke: "/api/jokes/create",
                updateJokeByID: "/api/jokes/:id",
                deleteJokeByID: "/api/jokes/:id",
            }
        })
    })

// startting the server  similar to @springbapplication.run()
const startServer = async () => {

    try {

    // we first sync the database
    await sequelize.sync({force: false});
    console.log('Database synchronized');

    // then we start the server
    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    }
    );

    } catch (error) {
        console.error('An error occurred: ', error);
        process.exit(1);
    }

}

startServer();








module.exports = app;