import Book from '../../models/book';

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
