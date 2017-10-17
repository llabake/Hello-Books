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
