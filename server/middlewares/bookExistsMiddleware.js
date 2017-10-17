import { dummyData } from '../helpers/modelHelpers';


const bookExists = (req, res, next) => {
    const bookId = req.params.bookId;
    if (dummyData.books.hasOwnProperty(bookId)) {
        next();
    } else {
       return res.status(404).json({message: "Book not found. Please check the id"})
    }
}

export default bookExists;