import Review from '../../models/review';

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

