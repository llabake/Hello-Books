/**
 *
 *
 * @export
 * @class VoteMiddleware
 */
export default class VoteMiddleware {
  /**
   *
   *@description Middleware to check the type of vote being cast
   * @static
   * @param {Object} req request Object
   * @param {Object} res response Object
   * @param {Function} next callback Function
   * @returns {Object} response on either vote
   * @memberof VoteMiddleware
   */
  static setUpVote(req, res, next) {
    req.voteType = 'upVote';
    next();
  }
  /**
   *
   *@description Middleware to check the type of vote being cast
   * @static
   * @param {Object} req request Object
   * @param {Object} res response Object
   * @param {Function} next callback Function
   * @returns {Object} response on either vote
   * @memberof VoteMiddleware
   */
  static setDownVote(req, res, next) {
    req.voteType = 'downVote';
    next();
  }
}

