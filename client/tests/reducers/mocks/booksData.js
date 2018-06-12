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

export const books = [book1, book2, book3]
export const bookCount = 3
export const error = {}
export const favoritedBook = book2
export const upvotedBook = {}
export const downvotedBook = {}
export const book3AfterReviewDeletion = {
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
    }
  ]
}

export const reviewToEdit = {}
export const book3AfterReviewUpdate = {
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
      content: 'the test content changed',
      caption: 'the test caption changed',
      user: 'dami'
    }
  ]
}
export const editedReview = {
  id: 3,
  content: 'the test content changed',
  caption: 'the test caption changed',
  user: 'dami'
}

export const popularBooks = [book3, book1]
export const topFavoriteBooks = [book2, book1]