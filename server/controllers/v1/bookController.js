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
    };
};

export const getSingleBook = (req, res) => {
    try {
        const book = Book.getById(req.params.bookId);
        return res.status(200).json({ book });
    } catch (error) {
        return res.status(400).json({ error});
    };
};

export const modifyBook = (req, res) => {
    try {
        const book = Book.updateById(req.params.bookId, req.body)
        return res.status(200).json({book})
        
    } catch (error) {
        return res.status(400).json({error});
    }
};

export const getAllBooks = (req, res) => {
    const books = Book.getAll();
    console.log(books)
    if (req.query.sort === 'upvotes' && req.query.order === 'desc') {
        books.sort((book1, book2) => {
           return book2.upvotes - book1.upvotes;
        })
    }
    return res.status(200).json({books});
}

export const borrowBook = (req, res) => {

    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);
    if (BorrowedBook.existsByUserIdAndBookId(userId, bookId)) {
        return res.status(409).json({message: "You have made this request earlier, baby!"});
    } else {
        const borrowedBook = new BorrowedBook({
            userId,
            bookId
        });
        borrowedBook.create();
        return res.status(200).json({
            message: 'Your request has been made and its being processed',
            borrowedBook
        });
    }

}