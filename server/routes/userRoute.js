import UserController from '../controllers/v1/userController';
import Authentication from '../middlewares/authenticationMiddleware';

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
  /**
  * @swagger
  * /api/v1/users/signin:
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
  app.post('/api/v1/users/signin', UserController.signIn);
  /**
  * @swagger
  * /api/v1/users/signout:
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
  app.post(
    '/api/v1/users/signout',
    Authentication.authMiddleware, UserController.signOut
  );

  /**
  * @swagger
  * /api/v1/users/signup/validate:
  *   get:
  *     tags:
  *       - User Functionality
  *     description: Checks if user exists
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
  *         description: Successfully found a user
  *       404:
  *         description: User not found
  */
  app.get(
    '/api/v1/users/signup/validate', UserController.checkUserExist
  )
  
  /**
  * @swagger
  * /api/v1/users/profile:
  *   put:
  *     tags:
  *       - User Functionality
  *     description: Edits user's profile
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
  *         description: Successfully modified user profile
  *       404:
  *         description: User not found
  */
  app.put(
    '/api/v1/users/profile',  Authentication.authMiddleware, UserController.editUserProfile
  )

  /**
  * @swagger
  * /api/v1/users/profile:
  *   get:
  *     tags:
  *       - User Functionality
  *     description: gets user exists
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
  *         description: Successfully found user object
  *       404:
  *         description: User not found
  */
  app.get(
    '/api/v1/users/profile', Authentication.authMiddleware, UserController.getUserProfile)
};
export default userRoute;
