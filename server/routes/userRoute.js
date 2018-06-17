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
 *       username: smith,
 *       password: smithpassword
 *     }
 *   Profile:
 *     properties:
 *       id:
 *         type: integer
 *       image:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *   EditProfileResponse:
 *       properties:
 *         userId:
 *           type: integer
 *         image:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         role:
 *            type: string
 *   EditProfile:
 *       properties:
 *         userId:
 *           type: integer
 *         image:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         role:
 *            type: string
 *       example: {
 *         firstName: smithed,
 *         lastName: William
 *     }
 * 
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - User Functionality
 *     summary: Signs user up
 *     description: Adds/Creates a new user
 *     produces:
 *       - application/json
 *     consumes:
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
 *         example: {
 *           message: Your Signup was successful smith,
 *           user: {
 *             id: 8,
 *             username: smith,
 *             email: wsmith@rocketmail.com
 *         },
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJyb2xlIjoibm9ybWFsIiwiZW1haWwiOiJ3c21pdGhAcm9ja2V0bWFpbC5jb20iLCJ1c2VybmFtZSI6InNtaXRoIiwiYWN0aXZlIjp0cnVlfSwiaWF0IjoxNTI5MTY5MTMyLCJleHAiOjE1MjkyNTU1MzJ9.L8Coxl62z6QYUyIVNua90E_Bqiz9dM0W_X0VGoa86j0
 *     }
 *       400:
 *         description: Incomplete parameters or type
 *         example: {
 *           username: username is required
 *     }
 *       409:
 *         description: User with username or email already exist
 *       500:
 *         description: Internal Server Error
 */
  app.post('/api/v1/users/signup', UserController.signUp);
  /**
  * @swagger
  * /api/v1/users/signin:
  *   post:
  *     tags:
  *       - User Functionality
  *     summary: Logs user in
  *     description: authenticates a user in the database
  *     produces:
  *       - application/json
  *     consumes:
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
  *         example: {
  *           message: Welcome smith, you're logged in,
  *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJyb2xlIjoibm9ybWFsIiwiZW1haWwiOiJ3c21pdGhAcm9ja2V0bWFpbC5jb20iLCJ1c2VybmFtZSI6InNtaXRoIiwiYWN0aXZlIjp0cnVlfSwiaWF0IjoxNTI5MTY5MTMyLCJleHAiOjE1MjkyNTU1MzJ9.L8Coxl62z6QYUyIVNua90E_Bqiz9dM0W_X0VGoa86j0
  *     }
  *       401:
  *         description: Unauthorized- Incomplete parameters or type
  *         example: {
  *           success: false,
  *           message: Authentication failed. Incorrect credentials.
  *     }
  *       500:
  *         description: Internal Server Error
  */
  app.post('/api/v1/users/signin', UserController.signIn);
  /**
  * @swagger
  * /api/v1/users/signout:
  *   post:
  *     tags:
  *       - User Functionality
  *     summary: Logs user out
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
  *         example: {
  *           message: You have successfully logged out smith
  *     }
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
  *     summary: Validates username or email existence
  *     description: Checks if user exists
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: username
  *         description: username to validate existence
  *         in: query
  *         type: string
  *       - name: email
  *         description: email to validate existence
  *         in: query
  *         type: email
  *     responses:
  *       200:
  *         description: Successfully found no user with parameter
  *         example: {
  *           message:  Username is valid | Email is valid
  *     }
  *       400:
  *         description: User parameter already exists
  *         example: {
  *           message: Username already taken | Email already taken | Email or Username expected in query,
  *     }
  *       500:
  *         description: Internal Server Error
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
  *     summary: Modify Profile
  *     description: Edits user's profile
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: authorization
  *         description: an authentication header
  *         type: string
  *         in: header
  *         required: true
  *       - name: user
  *         description: 
  *         in: body
  *         required: true
  *         schema: 
  *           $ref: '#/definitions/EditProfile'
  *     responses:
  *       200:
  *         description: Successfully modified user profile
  *         schema:
  *           type: object
  *           properties:
  *             profile:
  *               $ref: '#/definitions/EditProfileResponse'
  *             message: Profile modified successfully
  *       500:
  *         description: Internal Server Error
  *       400:
  *         description: Invalid credentials
  *         example: {
  *           firstName: firstName is required
  *     }
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
  *     summary: User Profile
  *     description: Gets user profile
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: authorization
  *         description: an authentication header
  *         type: string
  *         in: header
  *         required: true
  *     responses:
  *       200:
  *         description: Successfully retrieved user profile
  *         schema:
  *           type: object
  *           properties:
  *             profile:
  *               $ref: '#/definitions/Profile'
  *             message: Profile retrieved successfully
  *       400:
  *         description: Internal Server Error
  */
  app.get(
    '/api/v1/users/profile', Authentication.authMiddleware, UserController.getUserProfile)
};
export default userRoute;
