import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';


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

    isUserCreated: {
        type : DataTypes.BOOLEAN,
        allowNull: true,
    },

    countOfLikes: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    



}, {
    sequelize,
    modelName: 'Joke',
    tableName: 'jokes',
    underscored: true,
}

    

);


export default Joke;



