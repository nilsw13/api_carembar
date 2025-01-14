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
        url: "https://api-carembar.onrender.com", // Serveur de production
        description: "Serveur de production",
      },
      {
        url: "http://localhost:3000", // Serveur local
        description: "Serveur de développement",
      },
      
    ],
  },
  apis: ["./src/routes/*.js"],
 // Indique où Swagger doit chercher les commentaires
};

export const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
