import models from '../../models';

const { Book, Vote, } = models;

const fetchVote = async (voteModel, userId, bookId) => {
  let vote = Vote.findOne({ where: { userId, bookId } });
  return vote;
}

const fetchBook = async (bookModel, bookId) => {
  let book =  Book.findOne({ where: { id: bookId } })
  return book;
}

const createVote = async (voteModel, userId, bookId, voteType) => {
  let vote =  Vote.create({ userId, bookId, voteType })
  return vote;
}
/**
 *
 *
 * @export
 * @class VoteController
 */
export default class VoteController {
  /**
   * Votes a book as either upvote or downvote
   *
   * @static
   * 
   * @param {any} req
   * @param {any} res
   * 
   * @returns {Object} Vote cast success or error
   * @memberof VoteController
   */
  static async voteBook(req, res) {
    let vote, book;
    try {
      book = await fetchBook(Book, req.params.bookId)
      if(!book) {
        return res.status(404).json({
          message: `Book with id: ${req.params.bookId} not found`,
        });
      }
      vote = await fetchVote(Vote, req.user.id, req.params.bookId)
        if(!vote) {
          vote = await createVote(Vote, req.user.id, req.params.bookId, req.voteType)
          book = await book.increment(`${req.voteType}s`);
          const reloadedBook = await book.reload();
          return res.status(200).json({
            message: `You have successfully ${req.voteType.toLowerCase()}d ${book.title}`,
            book: reloadedBook
          });
        }
        if (vote.voteType === req.voteType) {
          res.status(409).json({
            message: `You already ${req.voteType.toLowerCase()}d ${book.title}`
          });
        } else {
          vote = await vote.update({ voteType: req.voteType })
          const fieldToIncrement = req.voteType === 'upVote' ? 'upVotes' : 'downVotes';
          const fieldToDecrement = fieldToIncrement === 'upVotes' ? 'downVotes' : 'upVotes';
          book = await book.increment(fieldToIncrement);
          book = await book.decrement(fieldToDecrement);
          const reloadedBook = await book.reload();
          vote.reload()
          return res.status(200).json({
            message: `You have successfully ${req.voteType.toLowerCase()}d ${book.title}`,
            book: reloadedBook
          });
        }
    } 
    catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
