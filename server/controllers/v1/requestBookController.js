import models from '../../models/';
import InputValidator from '../../helpers/inputValidator';
import { formatPagination, paginateBookResult } from '../../helpers/utils';

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
    const { errors, isValid } = InputValidator.requestBook(req.body);
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
  /**
   *
   * @static
   * 
   * @param {Object} req
   * 
   * @param {Object} res
   * 
   * @return {Array} requested books array
   * @memberof RequestBookController
   */
  static getRequestedBooks(req, res) {
    const { limit, page, offset } = formatPagination(req)
    RequestBook.findAndCountAll({
      limit,
      offset,
    })
      .then((result) => {
        return paginateBookResult({ req, res, result, limit, page })
      })
      .catch((error) => {
        return res.status(500).json({
          message: 'error sending your request',
          error
        });
      });
  }
}
