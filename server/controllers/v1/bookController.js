import Book from '../../models/book';
import BorrowedBook from '../../models/borrowedBook';


export const addBook = (req, res) => {
  try {
    const book = new Book(req.body);
    book.create();
    return res.status(201).json({
      message: `Book with title: ${book.title} has been added`, book
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getSingleBook = (req, res) => {
  try {
    const book = Book.getById(req.params.bookId);
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const modifyBook = (req, res) => {
  try {
    const book = Book.updateById(req.params.bookId, req.body);
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getAllBooks = (req, res) => {
  const books = Book.getAll();
  if (req.query.sort === 'upvotes' && req.query.order === 'desc') {
    books.sort((book1, book2) => book2.upvotes - book1.upvotes);
  }
  return res.status(200).json({ books });
};

export const borrowBook = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);
  try {
    if (!Book.isAvailable(bookId)) {
      return res.status(400).json({
        message: 'book currently not available for borrow'
      });
    }
    if (BorrowedBook.existsByUserIdAndBookId(userId, bookId)) {
      return res.status(409).json({
        message: 'You have made this request earlier!'
      });
    }
    const borrowedBook = new BorrowedBook({
      userId,
      bookId
    });
    borrowedBook.create();
    return res.status(200).json({
      message: 'Your request has been made and its being processed',
      borrowedBook
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const returnBook = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);
  try {
    const borrowedBook = BorrowedBook.getByUserIdAndBookId(userId, bookId);
    if (borrowedBook.borrowedStatus === 'accepted') {
      borrowedBook.returnStatus = 'pending';
      return res.status(200).json({ borrowedBook });
    }
    return res.status(400).json({
      message: 'Request to borrow is still pending'
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const acceptBorrowBook = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);
  try {
    const borrowedBook = BorrowedBook.getByUserIdAndBookId(userId, bookId);
    const book = Book.getById(bookId);
    book.quantity -= 1;
    borrowedBook.borrowedStatus = 'accepted';
    return res.status(200).json({ borrowedBook, book });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const acceptReturnBook = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const bookId = parseInt(req.params.bookId, 10);
  try {
    const book = Book.getById(bookId);
    const borrowedBook = BorrowedBook.getByUserIdAndBookId(userId, bookId);
    if (borrowedBook.returnStatus === 'pending') {
      borrowedBook.returnStatus = 'accepted';
      book.quantity += 1;
      return res.status(200).json({ borrowedBook, book });
    }
    return res.status(400).json({
      message: 'Request to return book has not been made'
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
