import Favorite from '../../models/favorite';
import Book from '../../models/book';

export const markBookAsFavorite = (req, res) => {
  try {
    const favorite = new Favorite({
      bookId: parseInt(req.params.bookId, 10),
      userId: parseInt(req.params.userId, 10)
    });
    favorite.create();
    const id = req.params.bookId;
    const book = Book.getById(id);
    return res.status(201).json({
      message: `The book: ${book.title} has been added to your favorite list`,
      favorite
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const retrieveUserFavorite = (req, res) => {
  const userFavorites =
  Favorite.getAllByUserId(parseInt(req.params.userId, 10));
  return res.status(200).json({ userFavorites });
};
