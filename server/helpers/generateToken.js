import jwt from 'jsonwebtoken';

const secret = 'mySecret';

/**
 * @description: protects the routes with jwt
 *
 * @export
 * @class Authentication
 */
export default class Authentication {
  /**
     *
     * @description: generate a login token
     * @param {Object} user payload to generate token
     * @returns {String} the gnerated token
     * @memberof Authentication
     */
  static generateToken(user) {
    const token = jwt.sign(
      {
        user: {
          id: user.id,
          role: user.role,
          email: user.email,
          username: user.username
        }
      },
      secret,
      { expiresIn: '24h' }
    );
    return token;
  }
}
