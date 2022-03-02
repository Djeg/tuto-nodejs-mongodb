import oas from 'fastify-oas'

/**
 * Configure la documentation de l'api
 */
export default async function apiDocPlugin(app) {
  // On enregistre le plugin OAS nous permettant d'avoir une documentation
  // compléte de notre API
  app.register(oas, {
    /**
     * Définie la route pour accéder à la documentation
     */
    routePrefix: process.env.API_DOC_PATH,
    /**
     * Active ou désactive la documentation
     */
    exposeRoute: process.env.API_DOC === 'true',
    /**
     * Configure l'interface de documentation
     */
    swagger: {
      /**
       * Définie les info générales de notre api
       */
      info: {
        title: 'Book api',
        description: 'Api de livres',
      },
      /**
       * Définie ce que notre api recois comme format (consumes) et
       * ce qu'elle retourne comme format (produces)
       */
      consumes: ['application/json'],
      produces: ['application/json'],
      /**
       * Configure le server de notre api
       */
      servers: [
        {
          url: `http://${process.env.HOST}:${process.env.PORT}`,
          description: "Server de l'api",
        },
      ],
    },
  })
}
