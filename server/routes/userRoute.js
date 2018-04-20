import UserController from '../controllers/v1/userController';
import Authentication from '../middlewares/authenticationMiddleware';

const userRoute = (app) => {
  /**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *       email:
 *         type: string
 *     example: {
 *       username: smith,
 *       firstName: William,
 *       lastName: Smith,
 *       password: smithpassword,
 *       email: wsmith@rocketmail.com
 *     }
 *   SignInData:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *       username: femi,
 *       password: femiBoy
 *     }
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - User Functionality
 *     description: Adds a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Incomplete parameters or type
 *       409:
 *         description: User with username or email already exist
 */
  app.post('/api/v1/users/signup', UserController.signUp);
  /**
  * @swagger
  * /api/v1/users/signin:
  *   post:
  *     tags:
  *       - User Functionality
  *     description: Sign in a user
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: user
  *         description: User Object
  *         in: body
  *         required: true
  *         schema:
  *           $ref: '#/definitions/SignInData'
  *     responses:
  *       200:
  *         description: Successfully logged in
  *       400:
  *         description: Incomplete parameters or type
  *       401:
  *         description: Invalid authentication credentials
  */
  app.post('/api/v1/users/signin', UserController.signIn);
  /**
  * @swagger
  * /api/v1/users/signout:
  *   post:
  *     tags:
  *       - User Functionality
  *     description: Log out user
  *     produces:
  *       - application/json
  *     parameters:
  *      - name: authorization
  *        in: header
  *        type: string
  *        required: true
  *     responses:
  *       200:
  *         description: Successfully log out user
  *       401:
  *         description: Authentication failed.
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
  *     description: Gets user profile
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
