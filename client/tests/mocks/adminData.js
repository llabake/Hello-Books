export default {
  book1: {
    id: 3,
    isbn: 526875,
    title: 'The Secret life of Baba Segi\'s wives',
    author: 'Lola Shoneyin',
    description: 'The secret of the lorax features a man selling air',
    image: 'https://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png',
    quantity: 23,
    updatedAt: '2018-02-20T35:20:01.852Z',
    createdAt: '2018-02-20T35:20:01.852Z'
  },
  book2: {
    id: 5,
    isbn: 574531,
    title: 'The Secret life of Baba Segi\'s wives',
    author: 'Lola Shoneyin',
    description: 'The secret of the lorax features a man selling air',
    image: 'https://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png',
    quantity: 23,
    updatedAt: '2018-02-20T35:20:01.852Z',
    createdAt: '2018-02-20T35:20:01.852Z'
  },
  book3: {
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
  },
  pendingAcceptBorrowedBookList: {
    "message":"borrow request has been made on dont be sad  and it is being processed",
    "borrowedBook": {
      "borrowStatus":"pending",
      "returnStatus":"",
      "id":15,
      "userId":2,
      "bookId":2,
      "updatedAt":"2018-03-25T16:05:46.426Z",
      "createdAt":"2018-03-25T16:05:46.426Z",
      "borrowDate":null,
      "expectedReturnDate":null,
      "actualReturnDate":null
      },
      "book": {
        "id":2,
        "title":"dont be sad ",
        "author":"Aaidh ibn Abdullah al-Qarni",
        "publishedYear":"2000","isbn":"298848",
        "quantity":2,
        "description":"dont be sad life is good ",
        "image":"https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk",
        "upVotes":2,
        "downVotes":0,
        "borrowCount":5,
        "aboutAuthor":"alrefi is a god writer ten ",
        "createdAt":"2018-03-12T14:51:55.457Z",
        "updatedAt":"2018-03-25T16:05:34.073Z",
        "book":[
            {
              "id":2,
              "borrowDate":"2018-03-14T17:02:38.102Z",
              "expectedReturnDate":"2018-03-28T17:02:38.102Z",
              "actualReturnDate":"2018-03-14T17:03:05.182Z",
              "borrowStatus":"accepted",
              "returnStatus":"accepted",
              "createdAt":"2018-03-12T14:52:15.685Z",
              "updatedAt":"2018-03-14T17:03:05.182Z",
              "bookId":2,
              "userId":2
            },
            {
              "id":8,
              "borrowDate":"2018-03-24T21:22:21.831Z",
              "expectedReturnDate":"2018-04-07T21:22:21.831Z",
              "actualReturnDate":null,
              "borrowStatus":"accepted",
              "returnStatus":"",
              "createdAt":"2018-03-15T18:38:29.905Z",
              "updatedAt":"2018-03-24T21:22:21.831Z",
              "bookId":2,
              "userId":3
            },
            {"id":12,"borrowDate":"2018-03-24T21:22:42.102Z","expectedReturnDate":"2018-04-07T21:22:42.102Z","actualReturnDate":null,"borrowStatus":"accepted","returnStatus":"","createdAt":"2018-03-19T16:24:50.433Z","updatedAt":"2018-03-24T21:22:42.102Z","bookId":2,"userId":6},{"id":7,"borrowDate":"2018-03-24T21:22:20.496Z","expectedReturnDate":"2018-04-07T21:22:20.496Z","actualReturnDate":"2018-03-25T16:05:34.060Z","borrowStatus":"accepted","returnStatus":"accepted","createdAt":"2018-03-14T17:37:23.386Z","updatedAt":"2018-03-25T16:05:34.060Z","bookId":2,"userId":2},
            {
              "id":15,
              "borrowDate":null,
              "expectedReturnDate":null,
              "actualReturnDate":null,
              "borrowStatus":"pending",
              "returnStatus":"",
              "createdAt":"2018-03-25T16:05:46.426Z",
              "updatedAt":"2018-03-25T16:05:46.426Z",
              "bookId":2,
              "userId":2
            }
          ]
        }
  },
  pendingAcceptReturnBookList: {
    "message":"Borrowed books retrieved successfully",
    "borrowedBooks":[
      {
        "id":15,
        "borrowDate":"2018-03-25T16:41:57.255Z",
        "expectedReturnDate":"2018-04-08T16:41:57.255Z",
        "actualReturnDate":null,
        "borrowStatus":"accepted",
        "returnStatus":"pending",
        "bookId":2,
        "userId":2,
        "user":{
          "username":"mama",
          "id":2
        },
        "book":{
          "id":2,
          "title":"dont be sad ",
          "author":"Aaidh ibn Abdullah al-Qarni",
          "quantity":1,
          "borrowCount":6
        }
      }
    ]
  },
  bookUpdateData: {
    description: "Polygamy",
    quanity: 56
  },
  book3Updated: {
    id: 6,
    isbn: 365242,
    title: 'The Secret life of Baba Segi\'s wives',
    author: 'Lola Shoneyin',
    description: 'Polygamy',
    image: 'https://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png',
    quantity: 56,
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
  },
  acceptBorrowRequest: {
    "message":"successfully accepted borrow request",
    "borrowedBook":{
      "id":16,
      "borrowDate":"2018-03-25T19:58:49.294Z",
      "expectedReturnDate":"2018-04-08T19:58:49.294Z",
      "actualReturnDate":null,
      "borrowStatus":"accepted",
      "returnStatus":"",
      "createdAt":"2018-03-25T19:58:33.833Z",
      "updatedAt":"2018-03-25T19:58:49.294Z",
      "bookId":3,
      "userId":2
    }
  },
  user: {
    id: 2
  },
  acceptReturnRequest: {
    "message":"successfully accepted return request",
    "borrowedBook":{
      "id":16,
      "borrowDate":"2018-03-25T19:58:49.294Z",
      "expectedReturnDate":"2018-04-08T19:58:49.294Z",
      "actualReturnDate":"2018-03-25T20:12:31.542Z",
      "borrowStatus":"accepted",
      "returnStatus":"accepted",
      "createdAt":"2018-03-25T19:58:33.833Z",
      "updatedAt":"2018-03-25T20:12:31.542Z",
      "bookId":3,
      "userId":2
    }
  }
}
