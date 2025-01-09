const {Model, DataTypes} = require('sequelize');

class Joke extends Model {}


Joke.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    answer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    } ,

}, {
    sequelize,
    modelName: 'Joke',
    tableName: 'jokes',
    underscored: true,
}

    

);


module.exports = Joke;



