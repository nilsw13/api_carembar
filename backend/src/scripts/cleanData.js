// Importons directement le modèle Joke et la connexion sequelize
const Joke = require('../models/Joke');
const sequelize = require('../config/database');

// Cette fonction asynchrone va gérer le nettoyage des données
const cleanData = async () => {
    try {
        // Utilisons une transaction pour s'assurer que toute l'opération est atomique
        await sequelize.transaction(async (transaction) => {
            // Nous utilisons TRUNCATE plutôt que DELETE pour réinitialiser aussi l'auto-increment
            await Joke.destroy({
                where: {},         // Cette clause vide signifie "toutes les lignes"
                truncate: true,    // Utilise TRUNCATE au lieu de DELETE
                force: true,       // Force l'opération même avec le soft delete
                transaction       // Inclut cette opération dans la transaction
            });

            console.log('✓ Toutes les blagues ont été supprimées de la base de données');
            console.log('✓ Les compteurs d\'auto-incrémentation ont été réinitialisés');
            console.log('✓ La structure de la table a été préservée');
            
            // Vous pouvez décommenter le code suivant si vous voulez réinsérer des données initiales
            
            const initialJokes = [
                {
                    question: "Quelle est la femelle du hamster ?",
                    answer: "L'Amsterdam",
                    countOfLikes: 10
                },
                {
                    question: "Que dit un oignon quand il se cogne ?",
                    answer: "Aïe",
                    countOfLikes: 18
                },
                {
                    question: "Quel est l'animal le plus heureux ?",
                    answer: "Le hibou, parce que sa femme est chouette",
                    countOfLikes: 11
                },
                {
                    question: " Pourquoi le football c'est rigolo ?",
                    answer: "Parce que Thierry en rit",
                    countOfLikes: 15
                },
                {
                    question: " Quel est le sport le plus fruité ?",
                    answer: "La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes",
                    countOfLikes: 13
                },
                {
                    question: "Que se fait un Schtroumpf quand il tombe ?",
                    answer: "Un Bleu",
                    countOfLikes: 12
                },
                {
                    question: " Quel est le comble pour un marin ?",
                    answer: "Avoir le nez qui coule",
                    countOfLikes: 14
                },
                {
                    question: " Qu'est ce que les enfants usent le plus à l'école ?",
                    answer: "Le professeur",
                    countOfLikes: 16
                },
                {
                    question: "Quel est le sport le plus silencieux ?",
                    answer: "Le para-chuuuut",
                    countOfLikes: 17
                },
                {
                    question: "Quel est le comble pour un joueur de bowling ?",
                    answer: "C’est de perdre la boule",
                    countOfLikes: 19
                },
            ];
            
            await Joke.bulkCreate(initialJokes, { transaction });
            console.log('✓ Les blagues initiales ont été réinsérées');
            
        });

    } catch (error) {
        console.error('Une erreur est survenue lors du nettoyage :', error.message);
        // En cas d'erreur dans une transaction, Sequelize effectue automatiquement un rollback
        throw error;
    }
};

// Cette condition vérifie si le script est exécuté directement (et non importé comme module)
if (require.main === module) {
    // Exécutons la fonction de nettoyage et gérons sa promesse
    cleanData()
        .then(() => {
            console.log('✓ Opération de nettoyage terminée avec succès');
            process.exit(0);  // Sortie propre du processus
        })
        .catch((error) => {
            console.error('✗ Échec de l\'opération de nettoyage:', error.message);
            process.exit(1);  // Sortie avec code d'erreur
        });
}

// Exportons la fonction pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = cleanData;