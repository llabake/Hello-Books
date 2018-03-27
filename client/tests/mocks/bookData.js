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

export const bookData = {
  isbn: 57531,
  title: 'The Secret life of Baba Segi\'s wives',
  author: 'Lola Shoneyin',
  description: 'The secret of the lorax features a man selling air',
  uploadedImage: '',
  quantity: 23,
  aboutTheAuthor: 'the is about the author',
  publishedYear: '2018'
}

export const addedBook = {
  id: 6,
  isbn: 57531,
  title: 'The Secret life of Baba Segi\'s wives',
  author: 'Lola Shoneyin',
  description: 'The secret of the lorax features a man selling air',
  image: '',
  quantity: 23,
  aboutTheAuthor: 'the is about the author',
  publishedYear: '2018',
  updatedAt: '2018-02-20T35:20:01.852Z',
  createdAt: '2018-02-20T35:20:01.852Z'
}
  
export const addedBookAfterFavoriteAction = {
  id: 6,
  isbn: 57531,
  title: 'The Secret life of Baba Segi\'s wives',
  author: 'Lola Shoneyin',
  description: 'The secret of the lorax features a man selling air',
  image: '',
  quantity: 23,
  aboutTheAuthor: 'the is about the author',
  publishedYear: '2018',
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
  ],
  favorited: [
    {
      id: 6,
      createdAt: "2018-03-14T15:53:42.475Z",
      user: {
        username: "mama", 
        id: 2
      }
    }
  ]
}
export const books = [book1, book2, book3]
export const popularBooks = [book1, book3]
export const topFavoriteBooks = [book3]
  
export const bookBeforeUpvoteAction = {
  aboutAuthor:"alrefi is a god writer ten ",
  author: "Aaidh ibn Abdullah al-Qarni",
  borrowCount: 0,
  description: "dont be sad life is good ",
  downVotes: 1,
  favorited: [
    {
      id: 6,
      createdAt: "2018-03-14T15:53:42.475Z",
      user: {
        username: "mama", 
        id: 2
      }
    }
  ],
  id: 2,
  image: "https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
  quantity: 4,
  reviews: [],
  title: "dont be sad ",
  upVotes: 0
}
export const bookAfterUpvoteAction = {
  aboutAuthor:"alrefi is a god writer ten ",
  author: "Aaidh ibn Abdullah al-Qarni",
  borrowCount: 0,
  description: "dont be sad life is good ",
  downVotes: 1,
  favorited: [
    {
      id: 6,
      createdAt: "2018-03-14T15:53:42.475Z",
      user: {
        username: "mama", 
        id: 2}
    }
  ],
  id: 2,
  image: "https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
  quantity: 4,
  reviews: [],
  title: "dont be sad ",
  upVotes: 1
}

export const bookAfterDownvoteAction = {
  aboutAuthor:"alrefi is a god writer ten ",
  author: "Aaidh ibn Abdullah al-Qarni",
  borrowCount: 0,
  description: "dont be sad life is good ",
  downVotes: 0,
  favorited: [
    {
      id: 6,
      createdAt: "2018-03-14T15:53:42.475Z",
      user: {
        username: "mama", 
        id: 2
      }
    }
  ],
  id: 2,
  image: "https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
  quantity: 4,
  reviews: [],
  title: "dont be sad ",
  upVotes: 1
}

export const  bookAfterReviewAction = {
  aboutAuthor: "alrefi is a god writer ten ",
  author: "Aaidh ibn Abdullah al-Qarni",
  borrowCount: 0,
  createdAt: "2018-03-12T14:51:55.457Z",
  description: "dont be sad life is good ",
  downVotes: 0,
  favorited:[
    {
      id: 6,
      createdAt: "2018-03-14T15:53:42.475Z",
      user: {
        username: "mama",
        id: 2
      }
    }
  ],
  id: 2,
  image: "https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
  isbn: "298848",
  publishedYear:"2000",
  quantity: 4,
  reviews: [
    {
      id: 2,
      content: "motivation and commitment",
      createdAt: "2018-03-14T16:24:37.305Z",
      caption:"escape",
      updatedAt: "2018-03-14T16:24:37.305Z",
      user: {username: "mama", id: 2}
    }
  ],
  title: "dont be sad ",
  upVotes: 1
}


export const borrowedBook = {
  actualReturnDate: null,
  bookId: 3,
  borrowDate: null,
  borrowStatus: "pending",
  createdAt: "2018-03-14T17:03:31.033Z",
  expectedReturnDate: null,
  id: 4,
  returnStatus: "",
  updatedAt: "2018-03-14T17:03:31.033Z",
  userId:2
}

export const bookAfterBorrowAction = {
  aboutAuthor: "alrefi is a god writer ten ",
  author: "Aaidh ibn Abdullah al-Qarni",
  book: [
    {
      0: {
        actualReturnDate: null,
        bookId: 3,
        borrowDate: null,
        borrowStatus: "pending",
        createdAt: "2018-03-14T17:03:31.033Z",
        expectedReturnDate: null,
        id: 4,
        returnStatus: "",
        updatedAt: "2018-03-14T17:03:31.033Z",
        userId:2
      },
    }
  ],
  borrowCount: 2,
  createdAt: "2018-03-12T14:51:55.457Z",
  description: "dont be sad life is good ",
  downVotes: 0,
  id: 2,
  image: "https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
  isbn: "298848",
  publishedYear: "2000",
  quantity: 4,
  title: "dont be sad ",
  upVotes: 1,
  updatedAt: "2018-03-14T17:21:14.663Z"
}


export const  bookAfterDeleteReviewAction = {
  aboutAuthor: "alrefi is a god writer ten ",
  author: "Aaidh ibn Abdullah al-Qarni",
  borrowCount: 0,
  createdAt: "2018-03-12T14:51:55.457Z",
  description: "dont be sad life is good ",
  downVotes: 0,
  favorited:[
    {
      id: 6,
      createdAt: "2018-03-14T15:53:42.475Z",
      user: {
        username: "mama",
        id: 2
      }
    }
  ],
  id: 2,
  image: "https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
  isbn: "298848",
  publishedYear:"2000",
  quantity: 4,
  reviews: [
    {
      id: 2,
      content: "motivation and commitment",
      createdAt: "2018-03-14T16:24:37.305Z",
      caption:"escape",
      updatedAt: "2018-03-14T16:24:37.305Z",
      user: {username: "mama", id: 2}
    }
  ],
  title: "dont be sad ",
  upVotes: 1
}

export const reviewData = {
  id: 2,
  content: "motivation and commitment",
  createdAt: "2018-03-14T16:24:37.305Z",
  caption:"escaped and safe",
  updatedAt: "2018-03-14T16:24:37.305Z",
  user: {username: "mama", id: 2}
}
export const  bookAfterEditReviewAction = {
  aboutAuthor: "alrefi is a god writer ten ",
  author: "Aaidh ibn Abdullah al-Qarni",
  borrowCount: 0,
  createdAt: "2018-03-12T14:51:55.457Z",
  description: "dont be sad life is good ",
  downVotes: 0,
  favorited:[
    {
      id: 6,
      createdAt: "2018-03-14T15:53:42.475Z",
      user: {
        username: "mama",
        id: 2
      }
    }
  ],
  id: 2,
  image: "https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
  isbn: "298848",
  publishedYear:"2000",
  quantity: 4,
  reviews: [
    {
      id: 2,
      content: "motivation and commitment",
      createdAt: "2018-03-14T16:24:37.305Z",
      caption:"escaped and safe",
      updatedAt: "2018-03-14T16:24:37.305Z",
      user: {username: "mama", id: 2}
    }
  ],
  title: "dont be sad ",
  upVotes: 1
}