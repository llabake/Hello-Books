import UserController from '../controllers/v1/userController';

const userRoute = (app) => {
  /**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - User Functionality
 *     description: Adds a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Incomplete parameters or type
 */
  app.post('/api/v1/users/signup', UserController.signUp);
};

export default userRoute;
