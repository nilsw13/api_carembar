import express, { json } from 'express';
import { authenticate, sync } from './config/database';
import jokesRoutes from './routes/jokeRoutes';
import sourceCheckMiddleware from './middleware/clientSourceCheck';
import cors from 'cors';

// Configuration des variables d'environnement
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Création de l'application Express
const app = express();

// Configuration CORS adaptative selon l'environnement
const corsOptions = {
    origin: isProduction 
        ? ['https://nilsw13.github.io/frontend_carambar'] // Remplacez nilsw13 par votre nom d'utilisateur GitHub
        : 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'X-client-source'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));

// Middleware pour parser le JSON
app.use(json());

// Middleware de sécurité pour la source client
app.use('/api', sourceCheckMiddleware);

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

// Fonction de démarrage du serveur améliorée
const startServer = async () => {
    try {
        // Vérification de la connexion à la base de données
        await authenticate();
        console.log('✅ Connexion à la base de données établie');

        // Synchronisation de la base de données (désactivée en production)
        await sync({
            force: false,
            alter: !isProduction // Désactive alter en production
        });
        console.log('✅ Base de données synchronisée');

        // Démarrage du serveur
        app.listen(PORT, () => {
            console.log(`✅ Serveur démarré sur le port ${PORT}`);
            console.log(`📝 Environnement: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔒 Mode production: ${isProduction}`);
        });
    } catch (error) {
        console.error('❌ Erreur au démarrage:', error);
        process.exit(1);
    }
};

// Gestion des erreurs non attrapées
process.on('unhandledRejection', (error) => {
    console.error('❌ Erreur non gérée:', error);
    process.exit(1);
});

// Démarrage du serveur
startServer();

export default app;