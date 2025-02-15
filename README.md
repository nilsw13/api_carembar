Carambar API 🍬 - Backend

Bienvenue dans le backend de Carambar & co, une API dédiée à la gestion et à l'affichage des blagues. Cette API est construite dans le cadre du projet de sélection CDA Simplon. Elle permet d'ajouter, de consulter, et de récupérer aléatoirement des blagues via une architecture simple et moderne.


   ⚠️ Attention : Utilisation du header custom

    Pour utiliser cette API, il est obligatoire d'ajouter un header custom à toutes les requêtes HTTP :

 
```bash
    curl -X GET https://api-carembar.onrender.com/api/jokes/random \
-H "x-client-source: carambar-frontend"
```


    Pourquoi ce header ?

    Ce header a été mis en place pour s'assurer que l'API est uniquement utilisée dans le cadre de l'application frontend prévue (landing page déployée sur GitHub Pages).
    Tester l'API avec Postman ou d'autres outils ?

    Pour tester cette API avec des outils comme Postman, cURL, ou autres, assurez-vous d'ajouter ce header custom à toutes vos requêtes.

    
    Exemple avec cURL :

```bash
    curl -X GET https://api-carembar.onrender.com/api/jokes \
-H "x-client-source: carambar-frontend"
```

⚠️ Si ce header n'est pas présent, l'API rejettera votre requête avec un message d'erreur.



📑 Fonctionnalités

    Ajouter une blague : Endpoint pour créer une nouvelle blague dans la base de données.
    Récupérer toutes les blagues : Endpoint pour lister toutes les blagues disponibles.
    Récupérer une blague spécifique : Endpoint pour obtenir une blague via son ID.
    Récupérer une blague aléatoire : Endpoint pour afficher une blague choisie au hasard.




🛠️ Technologies utilisées

    Node.js et Express.js : Serveur et API.
    Sequelize : ORM pour interagir avec la base de données SQLite.
    SQLite : Base de données légère et intégrée.
    Swagger : Documentation de l'API.
    Render.com : Déploiement du backend.


🚀 Liens importants

### 👉 Accédez à la documentation de l'API via Swagger
[Carambar API Documentation](https://api-carembar.onrender.com/api-docs)

### Accédez au depot du frontend (déployé sur GitHub Pages)
[Front-end repos](https://github.com/nilsw13/frontend_carambar)



📚 Guide d'installation et d'exécution
Pré-requis

    Node.js (version 16 ou plus) installé.
    npm (géré avec Node.js).
    Postman (pour tester les endpoints).


Étape 1 : Clonez le dépôt

 ```bash 
    git clone https://github.com/<votre-utilisateur>/carambar-api.git
    cd carambar-api

 ```

Étape 2 : Installez les dépendances

```bash
    npm install
```


Étape 3 : Lancez le serveur en local

```bash
    npm start
```

Par défaut, le serveur est accessible sur :
👉 http://localhost:3000


🛠️ Déploiement

Le backend est déployé sur Render.
### 👉 Lien vers l'API en production
[Carambar API](https://api-carembar.onrender.com/)


🌟 Auteur

 ### Créé avec ❤️ par [Nilsw13](https://github.com/nilsw13)
Simplon CDA, Projet Carambar API . 🍬