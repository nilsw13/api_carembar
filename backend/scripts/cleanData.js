// Importation des dépendances nécessaires
const Joke = require('../models/Joke');
const sequelize = require('../config/database');
const path = require('path');

// Configuration en fonction de l'environnement
const isProduction = process.env.NODE_ENV === 'production';
const dbPath = isProduction
  ? path.join('/etc/secrets', 'carambar.sqlite')
  : path.join(__dirname, '..', 'carambar.sqlite');

// Les données initiales avec le compteur de likes pour chaque blague
const initialJokes = [
    {
        question: "Quelle est la femelle du hamster ?",
        answer: "L'Amsterdam",
        countOfLikes: 10  // Ajout d'une valeur initiale pour les likes
    },
    {
        question: "Que dit un oignon quand il se cogne ?",
        answer: "Aïe",
        countOfLikes: 10
    },
    // ... vos autres blagues ...
].map(joke => ({
    ...joke,
    countOfLikes: joke.countOfLikes || 10  // Assure que chaque blague a un compteur initial
}));

// Fonction de nettoyage et réinitialisation des données
const cleanData = async () => {
    try {
        // Vérifions d'abord la connexion à la base de données
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données établie');

        await sequelize.transaction(async (transaction) => {
            console.log('🗑️  Nettoyage de la base de données...');
            await Joke.destroy({
                where: {},
                truncate: true,
                force: true,
                transaction
            });
            console.log('✅ Toutes les blagues ont été supprimées');
            
            console.log('🌱 Insertion des nouvelles blagues...');
            await Joke.bulkCreate(initialJokes, { 
                transaction,
                // Spécifions explicitement les champs à créer
                fields: ['question', 'answer', 'countOfLikes']
            });
            
            // Vérifions le nombre de blagues insérées
            const count = await Joke.count({ transaction });
            console.log(`✅ ${count} blagues ont été insérées avec succès`);
        });

        console.log('🎉 Opération de nettoyage et réinitialisation terminée');
        
    } catch (error) {
        console.error('❌ Une erreur est survenue :', error.message);
        throw error;
    }
};

// Exécution conditionnelle du script
if (require.main === module) {
    cleanData()
        .then(() => {
            console.log('✨ Tout est prêt !');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Échec de l\'opération:', error.message);
            process.exit(1);
        });
}

module.exports = cleanData;