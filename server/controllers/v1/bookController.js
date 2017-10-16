import Book from '../../models/book';

export const addBook = (req, res) => {
    try {
        const book = new Book(req.body);
        book.create();
        return res.status(201).json({ message: `Book with title: ${book.title} has been added`, book })
    } catch (error) {
        return res.status(400).json({ error})
    }
};

export const getSingleBook = (req, res) => {
    try {
        const book = Book.getById(req.params.bookId);
        return res.status(200).json({ book });
    } catch (error) {
        return res.status(400).json({ error});
    }
};

export const modifyBook = (req, res) => {
    try {
        const book = Book.getById(req.params.bookId);
        const updateFields = [ 'title', 'author', 'isbn', 'publishedYear', 'quantity' ];    
        updateFields.forEach(field => {
            book[field] = req.body[field] || book[field];
        });
        return res.status(200).json({ message: `Book has been updated`, book })
    } catch (error) {
        return res.status(400).json({error});        
    }
};

export const getAllBooks = (req, res) => {
  const books = Book.getAll();
  return res.status(200).json({books});
};

