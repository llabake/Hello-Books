// change it back to models/review
import Review from '../../dummy/models/review';
/**
 *
 *
 * @param {any} req
 * @param {any} res
 * @returns {any} response containing a message
 */
const addReview = (req, res) => {
  try {
    const review = new Review({
      text: req.body.text,
      bookId: parseInt(req.params.bookId, 10),
      userId: parseInt(req.params.userId, 10)
    });
    review.create();
    return res.status(201).json({
      message: `Review with content: ${review.text} has been added`, review
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default addReview;
