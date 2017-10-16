import Book from '../../models/book';

export const addBook = (req, res) => {
    try {
        const book = new Book(req.body);
        book.save();
        return res.status(201).json({ message: `Book with ${book.title} has been added`, book })
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error})
    }
};

