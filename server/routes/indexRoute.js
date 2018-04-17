const indexRoute = (app) => {
  /**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Welcome to Hello Books
 *     description: Returns a welcome message
 *     responses:
 *       200:
 *         description: Welcome to Hello Books Library
 */
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Hello Books',
  }));
};

export default indexRoute;
