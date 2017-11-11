import BorrowedBook from '../dummy/models/borrowedBook';


const borrowedBookExists = (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);

  if (!BorrowedBook.existsByUserIdAndBookId(userId, bookId)) {
    return res.status(400).json({
      message: "Request to borrow book hasn't been made"
    });
  }
  next();
};

export default borrowedBookExists;
