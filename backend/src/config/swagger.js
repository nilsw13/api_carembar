import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "Carambar API Documentation", // Titre de l'API
      version: "1.0.0", // Version de l'API
      description: "Documentation pour mon api projet selection CDA SIMPLON", // Description de l'API
    },
    servers: [
      {
        url: "http://localhost:3000", // Serveur local
        description: "Serveur de développement",
      },
      {
        url: "https://api-carembar.onrender.com", // Serveur de production
        description: "Serveur de production",
      },
    ],
  },
  apis: ["./routes/*.js"], // Indique où Swagger doit chercher les commentaires
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
