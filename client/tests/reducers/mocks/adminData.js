export const book1 = {
  id: 3,
  isbn: 526875,
  title: 'The Secret life of Baba Segi\'s wives',
  author: 'Lola Shoneyin',
  description: 'The secret of the lorax features a man selling air',
  image: 'https://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png',
  quantity: 23,
  updatedAt: '2018-02-20T35:20:01.852Z',
  createdAt: '2018-02-20T35:20:01.852Z'
}

export const book2 = {
  id: 5,
  isbn: 574531,
  title: 'The Secret life of Baba Segi\'s wives',
  author: 'Lola Shoneyin',
  description: 'The secret of the lorax features a man selling air',
  image: 'https://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png',
  quantity: 23,
  updatedAt: '2018-02-20T35:20:01.852Z',
  createdAt: '2018-02-20T35:20:01.852Z'
}

export const book3 = {
  id: 6,
  isbn: 365242,
  title: 'The Secret life of Baba Segi\'s wives',
  author: 'Lola Shoneyin',
  description: 'The secret of the lorax features a man selling air',
  image: 'https://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png',
  quantity: 23,
  updatedAt: '2018-02-20T35:20:01.852Z',
  createdAt: '2018-02-20T35:20:01.852Z',
  reviews: [
    {
      id: 2,
      content: 'the content',
      caption: 'the caption then',
      user: 'anne'
    },
    {
      id: 3,
      content: 'the test content',
      caption: 'the test caption',
      user: 'dami'
    }
  ]
}
export const book1Modified = {
  id: 3,
  isbn: 526875,
  title: 'The Secret life of Baba Segi\'s wives',
  author: 'Lola Shoneyin and Lola',
  description: 'The secret of the lorax features a man selling air',
  image: 'https://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png',
  quantity: 23,
  updatedAt: '2018-02-20T35:20:01.852Z',
  createdAt: '2018-02-20T35:20:01.852Z'
}

 

export const book = {}
export const allBooks = [book1, book2, book3]
export const error = {}

export const pendingBorrowedBookRequest = []
export const pendingReturnedBookRequest = []
export const allBooksAfterABookDeletion = [book1, book2,]
export const allBooksAfterABookModification = [book1Modified, book2, book3]
export const pendingBorrowedBookRequestList = [ book1, book3]
export const acceptedPendingBorrowedBookRequestList = [ book3]
export const pendingReturnedBookRequestList = [ book1, book3]
export const acceptedPendingReturnedBookRequestList = [ book3]