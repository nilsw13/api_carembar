import express, { json } from 'express';
import { initializeDatabase } from './config/database.js';
import {swaggerSpec} from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';
import jokesRoutes from './routes/jokeRoutes.js';
import sourceCheckMiddleware from './middleware/clientSourceCheck.js';
import cors from 'cors';




const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Création de l'application Express
const app = express();


const corsOptions = {
    origin: isProduction 
        ? ['https://nilsw13.github.io'] 
        : 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'X-client-source'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};
app.use(cors(corsOptions));

// Middleware pour parser le JSON
app.use(json());

// Middleware de sécurité pour la source client
app.use('/api', sourceCheckMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





// Route de santé pour Render
app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Routes de l'API
app.use("/api", jokesRoutes);

// Route d'accueil avec documentation de l'API
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenue sur l'api Carambar Jokes !",
        version: "1.0.0",
        author: "Nils Wenting",
        environment: process.env.NODE_ENV || 'development',
        endpoints: {
            getJokes: "/api/jokes",
            getJokeByID: "/api/jokes/:id",
            addJoke: "/api/jokes/create",
        }
    });
});








const startServer = async () => {
    try {
        // Initialisation de la base de données
        await initializeDatabase();
        
        // Démarrage du serveur
        app.listen(PORT, () => {
            console.log(` Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error('Erreur au démarrage:', error);
        process.exit(1);
    }
};

startServer();

export default app;