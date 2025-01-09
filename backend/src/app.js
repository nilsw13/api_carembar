const express = require('express');
const sequelize = require('./config/database');



// create express app ( similar to @springbootapplication)

const app = express();

app.use(express.json());


// test routes to see if the server is running at / 


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