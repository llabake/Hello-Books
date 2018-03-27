

// authenticated: false
// loading: false
export const response = {  
  username: 'labake',
  email: 'labake.labs@gmail.com',
}
export const authUser = {
  username: 'labake',
  email: 'labake.labs@gmail.com',
}
export const user = {  
  id: 3,
  role: 'normal',
  active: true,
  username: 'labake',
  email: 'labake.labs@gmail.com',
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

export const borrowedBookHistory = [book2, book3]
export const favoriteBooks = [
  { id: 2, book: book2},
  { id: 5, book: book3}
]
export const favoriteBooksAfterUnFavoriting = [{ id: 2, book: book2}]
export const profile = {
  username: 'labake',
  email: 'labs.lem@gmail.com'
}
export const error = {}
