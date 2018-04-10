import models from '../../models/';
import InputValidator from '../../helpers/inputValidator';

const { RequestBook } = models;

/**
 * 
 * 
 * @export
 * @class RequestBookController
 */
export default class RequestBookController {
  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * 
   * @returns {Object} requested book object
   * @memberof RequestBookController
   */
  static requestBook(req, res) {
    const { errors, isValid } = InputValidator.requetsBook(req.body);
    if (!isValid) {
      res.status(400).json({ errors });
    } else {
      RequestBook.create({
        userId: req.user.id,
        title: req.body.title,
        author: req.body.author 
      })
      .then((requestedBook) => {
        return res.status(201).json({
          message: "Thank you for the book suggestion, the management is always at your service",
          requestedBook
        }) 
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message
        })
      })
    }
  }
}
