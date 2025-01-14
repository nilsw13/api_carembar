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


// ajouter swagger jsdoc

/**
 * @swagger
 * api/v1/jokes:
 *   get:
 *     summary: Récupérer toutes les blagues
 *     description: Cette route permet de récupérer toutes les blagues disponibles.
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       question:
 *                         type: string
 *                         example: "Pourquoi les développeurs n'aiment pas la nature ?"
 *                       answer:
 *                         type: string
 *                         example: "Parce qu'il y a trop de bugs."
 *                       isUserCreated:
 *                         type: boolean
 *                         example: true
 *                       countOfLikes:
 *                         type: integer
 *                         example: 5
 */
router.get('/v1/jokes', getAllJokes);




/**
 * @swagger
 * api/v1/jokes/random:
 *   get:
 *     summary: Récupérer une blague aléatoire
 *     description: Cette route renvoie une blague choisie aléatoirement parmi toutes celles disponibles.
 *     responses:
 *       200:
 *         description: Une blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: "Pourquoi les développeurs n'aiment pas la nature ?"
 *                     answer:
 *                       type: string
 *                       example: "Parce qu'il y a trop de bugs."
 *                     isUserCreated:
 *                       type: boolean
 *                       example: true
 *                     countOfLikes:
 *                       type: integer
 *                       example: 5
 */
router.get('/v1/jokes/random', getRandomJoke);

/**
 * @swagger
 * api/v1/jokes/{id}:
 *   get:
 *     summary: Récupérer une blague par ID
 *     description: Cette route permet de récupérer une blague spécifique en utilisant son identifiant unique.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant unique de la blague
 *     responses:
 *       200:
 *         description: Une blague spécifique
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: "Pourquoi les développeurs n'aiment pas la nature ?"
 *                     answer:
 *                       type: string
 *                       example: "Parce qu'il y a trop de bugs."
 *                     isUserCreated:
 *                       type: boolean
 *                       example: true
 *                     countOfLikes:
 *                       type: integer
 *                       example: 5
 *       404:
 *         description: Blague non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Joke not found"
 */
router.get('/v1/jokes/:id', getJokeById);

/**
 * @swagger
 * api/v1/jokes/{id}:
 *   delete:
 *     summary: Supprimer une blague par ID
 *     description: Cette route permet de supprimer une blague spécifique si elle a moins de 10 likes.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant unique de la blague à supprimer
 *     responses:
 *       200:
 *         description: Blague supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       question:
 *                         type: string
 *                         example: "Quelle est la blague préférée des développeurs ?"
 *                       answer:
 *                         type: string
 *                         example: "Les puns dans le code."
 *       403:
 *         description: Blague non supprimée car elle a trop de likes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "You cannot delete a joke with more than 10 likes"
 */
router.delete('/v1/jokes/delete/:id', deleteJokeById);





/**
 * @swagger
 * api/v1/jokes/{id}/like:
 *   post:
 *     summary: Ajouter un like à une blague
 *     description: Cette route permet d'incrémenter le nombre de likes pour une blague spécifique.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant unique de la blague
 *     responses:
 *       200:
 *         description: Like ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: "Pourquoi les développeurs aiment les blagues ?"
 *                     answer:
 *                       type: string
 *                       example: "Parce qu'elles ne plantent pas !"
 *                     isUserCreated:
 *                       type: boolean
 *                       example: true
 *                     countOfLikes:
 *                       type: integer
 *                       example: 6
 */

router.post('/v1/jokes/:id/like', likeJoke);

/**
 * @swagger
 * api/v1/jokes/create:
 *   post:
 *     summary: Créer une nouvelle blague
 *     description: Cette route permet de créer une nouvelle blague et de l'ajouter à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Quelle est la blague préférée des développeurs ?"
 *               answer:
 *                 type: string
 *                 example: "Les puns dans le code."
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: "Quelle est la blague préférée des développeurs ?"
 *                     answer:
 *                       type: string
 *                       example: "Les puns dans le code."
 *                     isUserCreated:
 *                       type: boolean
 *                       example: true
 *                     countOfLikes:
 *                       type: integer
 *                       example: 0
 */
router.post('/v1/jokes/create', createJoke);


export default router;