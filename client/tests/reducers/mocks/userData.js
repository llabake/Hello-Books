

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

export const borrowedBook = {
  id: 77,
  borrowDate: "2018-06-05T12:22:07.788Z",
  expectedReturnDate: "2018-06-19T12:22:07.788Z",
  actualReturnDate: null,
  borrowStatus: "accepted",
  returnStatus: "pending",
  createdAt: "2018-06-05T12:22:01.721Z",
  updatedAt: "2018-06-05T12:22:07.789Z",
  bookId: 5,
  userId: 2,
}
export const favoriteBooks = [
  { id: 2, book: book2 },
  { id: 5, book: book3 }
]
export const favoriteBooksAfterUnFavoriting = [{ id: 2, book: book2 }]
export const profile = {
  username: 'labake',
  email: 'labs.lem@gmail.com'
}

export const editedProfile = {
  username: 'anotherlabake2',
  email: 'labs.lem@gmail.com'
}
export const error = {}


export const borrowedBookHistory = [
  {
    "id": 77,
    "borrowDate": "2018-06-05T12:22:07.788Z",
    "expectedReturnDate": "2018-06-19T12:22:07.788Z",
    "actualReturnDate": null,
    "borrowStatus": "accepted",
    "returnStatus": "",
    "createdAt": "2018-06-05T12:22:01.721Z",
    "updatedAt": "2018-06-05T12:22:07.789Z",
    "bookId": 5,
    "userId": 2,
    "book": {
      "id": 5,
      "title": "Fine Boys",
      "author": "Imaseun Egbosa",
      "publishedYear": "2012",
      "isbn": "7698102987364",
      "quantity": 6,
      "description": "Youth juvenile deliquency",
      "image": "http://res.cloudinary.com/sardaunan/image/upload/v1525557110/fine%20boys.jpg",
      "upVotes": 1,
      "downVotes": 0,
      "borrowCount": 7,
      "aboutAuthor": "Great Author",
      "createdAt": "2018-05-08T12:02:49.802Z",
      "updatedAt": "2018-06-05T12:22:07.796Z"
    }
  },
  {
    "id": 69,
    "borrowDate": "2018-06-04T15:14:31.487Z",
    "expectedReturnDate": "2018-06-18T15:14:31.487Z",
    "actualReturnDate": null,
    "borrowStatus": "accepted",
    "returnStatus": "",
    "createdAt": "2018-06-04T14:59:49.848Z",
    "updatedAt": "2018-06-04T15:14:31.487Z",
    "bookId": 6,
    "userId": 2,
    "book": {
      "id": 6,
      "title": "Productive Muslim",
      "author": "mohammed farris",
      "publishedYear": "2015",
      "isbn": "9674352817652",
      "quantity": 4,
      "description": "this book is for the productive muslims",
      "image": "http://res.cloudinary.com/sardaunan/image/upload/v1525557153/productive%20muslim.jpg",
      "upVotes": 0,
      "downVotes": 1,
      "borrowCount": 11,
      "aboutAuthor": "mo farris is a great author",
      "createdAt": "2018-05-08T12:02:49.802Z",
      "updatedAt": "2018-06-04T15:14:31.492Z"
    }
  },
]
export const borrowedBookHistoryAfterReturn = [
  {
    "id": 77,
    "borrowDate": "2018-06-05T12:22:07.788Z",
    "expectedReturnDate": "2018-06-19T12:22:07.788Z",
    "actualReturnDate": null,
    "borrowStatus": "accepted",
    "returnStatus": "pending",
    "createdAt": "2018-06-05T12:22:01.721Z",
    "updatedAt": "2018-06-05T12:22:07.789Z",
    "bookId": 5,
    "userId": 2,
    "book": {
      "id": 5,
      "title": "Fine Boys",
      "author": "Imaseun Egbosa",
      "publishedYear": "2012",
      "isbn": "7698102987364",
      "quantity": 6,
      "description": "Youth juvenile deliquency",
      "image": "http://res.cloudinary.com/sardaunan/image/upload/v1525557110/fine%20boys.jpg",
      "upVotes": 1,
      "downVotes": 0,
      "borrowCount": 7,
      "aboutAuthor": "Great Author",
      "createdAt": "2018-05-08T12:02:49.802Z",
      "updatedAt": "2018-06-05T12:22:07.796Z"
    }
  },
  {
    "id": 69,
    "borrowDate": "2018-06-04T15:14:31.487Z",
    "expectedReturnDate": "2018-06-18T15:14:31.487Z",
    "actualReturnDate": null,
    "borrowStatus": "accepted",
    "returnStatus": "",
    "createdAt": "2018-06-04T14:59:49.848Z",
    "updatedAt": "2018-06-04T15:14:31.487Z",
    "bookId": 6,
    "userId": 2,
    "book": {
      "id": 6,
      "title": "Productive Muslim",
      "author": "mohammed farris",
      "publishedYear": "2015",
      "isbn": "9674352817652",
      "quantity": 4,
      "description": "this book is for the productive muslims",
      "image": "http://res.cloudinary.com/sardaunan/image/upload/v1525557153/productive%20muslim.jpg",
      "upVotes": 0,
      "downVotes": 1,
      "borrowCount": 11,
      "aboutAuthor": "mo farris is a great author",
      "createdAt": "2018-05-08T12:02:49.802Z",
      "updatedAt": "2018-06-04T15:14:31.492Z"
    }
  },
]

