
const validateParamsMiddleware = (req, res, next) => {
  let { bookId, userId, reviewId } = req.params
  if(bookId) {
    bookId = parseInt(bookId, 10)
    if(!Number.isInteger(bookId)) {
      return res.status(400).json({
        message: 'bookId must be a valid integer'
      })
    }
  }
  if(userId) {
    userId = parseInt(userId, 10)
    if(!Number.isInteger(userId)) {
      return res.status(400).json({
        message: 'userId must be a valid integer'
      })
    }
  }
  if(reviewId) {
    userId = parseInt(reviewId, 10)
    if(!Number.isInteger(userId)) {
      return res.status(400).json({
        message: 'reviewId must be a valid integer'
      })
    }
  }
  next()
}

export default validateParamsMiddleware;
