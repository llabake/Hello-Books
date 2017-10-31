import { dummyData } from '../helpers/modelHelpers';


const bookExists = (req, res, next) => {
  const { bookId } = req.params.bookId;
  if (Object.prototype.hasOwnProperty.call(dummyData.books, bookId)) {
    next();
  } else {
    return res.status(404).json({
      message: 'Book not found. Please check the id'
    });
  }
};

export default bookExists;
