import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

// En production sur Render, utilisons un chemin dans le dossier tmp qui est accessible en écriture
const dbPath = isProduction
  ? path.join('/tmp', 'carambar.sqlite')  // Utilisation du dossier /tmp
  : path.join(__dirname, '..', 'carambar.sqlite');

// Assurons-nous que le dossier parent existe
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: isProduction ? false : console.log
});

// Fonction d'initialisation améliorée
export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion établie');
        
        // Synchronisation de la base de données
        await sequelize.sync({ force: isProduction }); // force: true en production car la DB est éphémère
        console.log('✅ Base de données synchronisée');

        // Ajout des données initiales si la base est vide
        const Joke = sequelize.models.Joke;
        const count = await Joke.count();
        if (count === 0) {
            console.log('💫 Initialisation des données...');
            await Joke.bulkCreate([
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
                answer: "Avoir le nez qui coule",
                countOfLikes: 14
            },
            {
                question: " Qu'est ce que les enfants usent le plus à l'école ?",
                answer: "Le professeur",
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

              
            ]);
            console.log('✅ Données initiales créées');
        }
    } catch (error) {
        console.error('❌ Erreur d\'initialisation :', error);
        throw error;
    }
};