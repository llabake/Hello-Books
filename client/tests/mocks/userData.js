export default {
  validUser1: {
    username: 'ObiWalker',
    email: 'obi.walker@andela.com',
    password: 'walker',
    firstName: 'obi',
    lastName: 'walker',
    confirmpassword: 'walker'
  },
  validUser2: {
    username: 'solape',
    email: 'damywuraola@gmail.com',
    password: 'damola',
    confirmpassword: 'damola',
    firstName: 'adedamola',
    lastName: 'wuraola'
  },
  payload: {
    username: 'idrees'
  },
  signUpResponse: {
    message: "Your Signup was successful ObiWalker",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJyb2xlIjoibm9ybWFsIiwiZW1haWwiOiJvYmkud2Fsa2VyQGFuZGVsYS5jb20iLCJ1c2VybmFtZSI6Ik9iaVdhbGtlciIsImFjdGl2ZSI6dHJ1ZX0sImlhdCI6MTUyMTU3NDU4MSwiZXhwIjoxNTIxNjYwOTgxfQ.MsLArFgkScRjIyoMOML_vQpgbC52URdju991LRNYoAk",
    // token: "tokentokentoken",
    user:
      {
        email: "obi.walker@andela.com",
        id: 3,
        username: "ObiWalker",
      }
  },
  signInData: {
    username: 'ObiWalker',
    password: 'walker',
  },
  signInResponse: {
    message: "Welcome ObiWalker, you're logged in",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJyb2xlIjoibm9ybWFsIiwiZW1haWwiOiJvYmkud2Fsa2VyQGFuZGVsYS5jb20iLCJ1c2VybmFtZSI6Ik9iaVdhbGtlciIsImFjdGl2ZSI6dHJ1ZX0sImlhdCI6MTUyMTU3NDU4MSwiZXhwIjoxNTIxNjYwOTgxfQ.MsLArFgkScRjIyoMOML_vQpgbC52URdju991LRNYoAk"
  },
  invalidSignInData: {
    username: 'ObiWalker',
    password: 'labake',
  },
  invalidSignInResponse: {
    message: "Authentication failed. Incorrect credentials.",
    success: false
  },
  userBorrowedBookListError: {
    // data: {
      message:'error sending your request'
    // },
    // error: {}
  },
  returnBookResponse: {
    message: 'Book return request is pending approval by Administrator',
    borrowedBook: [
        {
        "id":14,
        "borrowDate":"2018-03-24T21:23:36.572Z",
        "expectedReturnDate":"2018-04-07T21:23:36.572Z",
        "actualReturnDate":null,
        "borrowStatus":"accepted",
        "returnStatus":"pending",
        "createdAt":"2018-03-24T21:23:04.337Z",
        "updatedAt":"2018-03-24T21:23:47.266Z",
        "bookId":3,
        "userId":2
      }
    ]
  },
  returnBookError: {
    data: {
      message:'error sending your request'
    },
    error: {}
  },
  book1: {
    id: 2,
    title: 'dont be sad ',
    author: 'Aaidh ibn Abdullah al-Qarni',
    publishedYear: '2000',
    isbn: '298848',
    quantity: 4,
    description: 'dont be sad life is good ',
    image: 'https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk',
    upVotes: 1,
    downVotes: 0,
    borrowCount: 2,
    aboutAuthor: 'alrefi is a god writer ten ',
    createdAt: '2018-03-12T14:51:55.457Z',
    updatedAt: '2018-03-14T17:21:14.663Z'
  },
  book2: {
    id: 3,
    title: 'Never eat alone ',
    author: 'Keith Ferrazi',
    publishedYear: '2014',
    isbn: '385346654',
    quantity: 7,
    description: '"Everyone in business knows relationships and having a network of contacts is important. Finally we have a real-world guide to how to create your own high-powered network tailored to your career goals and personal style."',
    image: 'https://res.cloudinary.com/sardaunan/image/upload/v1520868439/rrtw8mjav6q9ntjnysvgk.jpg',
    upVotes: 0,
    downVotes: 1,
    borrowCount: 2,
    aboutAuthor: 'KEITH FERRAZZI is founder and CEO of the training and consulting company Ferrazzi Greenlight and a contributor to Inc., the Wall Street Journal, and Harvard Business Review. Earlier in his career, he was CMO of Deloitte Consulting and at Starwood Hotels and Resorts, and CEO of YaYa Media. He lives in Los Angeles.',
    createdAt: '2018-03-12T15:27:19.859Z',
    updatedAt: '2018-03-14T17:21:13.503Z'
  },
  borrowedBookList: [
    {
      id: 8,
      borrowDate: null,
      expectedReturnDate: null,
      actualReturnDate: null,
      borrowStatus: 'pending',
      returnStatus: '',
      createdAt: '2018-03-15T18:38:29.905Z',
      updatedAt: '2018-03-15T18:38:29.905Z',
      bookId: 2,
      userId: 3,
      book: {
        id: 2,
        title: 'dont be sad ',
        author: 'Aaidh ibn Abdullah al-Qarni',
        publishedYear: '2000',
        isbn: '298848',
        quantity: 4,
        description: 'dont be sad life is good ',
        image: 'https://res.cloudinary.com/sardaunan/image/upload/v1520866315/hbg1rryhpzabtnh2akzx.webpk',
        upVotes: 1,
        downVotes: 0,
        borrowCount: 2,
        aboutAuthor: 'alrefi is a god writer ten ',
        createdAt: '2018-03-12T14:51:55.457Z',
        updatedAt: '2018-03-14T17:21:14.663Z'
      }
    },
    {
      id: 9,
      borrowDate: null,
      expectedReturnDate: null,
      actualReturnDate: null,
      borrowStatus: 'pending',
      returnStatus: '',
      createdAt: '2018-03-15T18:40:58.296Z',
      updatedAt: '2018-03-15T18:40:58.296Z',
      bookId: 3,
      userId: 3,
      book: {
        id: 3,
        title: 'Never eat alone ',
        author: 'Keith Ferrazi',
        publishedYear: '2014',
        isbn: '385346654',
        quantity: 7,
        description: '"Everyone in business knows relationships and having a network of contacts is important. Finally we have a real-world guide to how to create your own high-powered network tailored to your career goals and personal style."',
        image: 'https://res.cloudinary.com/sardaunan/image/upload/v1520868439/rrtw8mjav6q9ntjnysvgk.jpg',
        upVotes: 0,
        downVotes: 1,
        borrowCount: 2,
        aboutAuthor: 'KEITH FERRAZZI is founder and CEO of the training and consulting company Ferrazzi Greenlight and a contributor to Inc., the Wall Street Journal, and Harvard Business Review. Earlier in his career, he was CMO of Deloitte Consulting and at Starwood Hotels and Resorts, and CEO of YaYa Media. He lives in Los Angeles.',
        createdAt: '2018-03-12T15:27:19.859Z',
        updatedAt: '2018-03-14T17:21:13.503Z'
      }
    }
  ],
  userFavoriteResponse:{
    "message": "Favorite Book(s) retrieved successfully",
    "favorites":[
      {
        "createdAt":"2018-03-14T07:03:45.278Z",
        "book":
          {
            "id": 3,
            "title": "Never eat alone ",
            "description":"\"Everyone in business knows relationships and having a network of contacts is important. Finally we have a real-world guide to how to create your own high-powered network tailored to your career goals and personal style.\"",
            "upVotes": 2,
            "downVotes": 1,
            "image":"https://res.cloudinary.com/sardaunan/image/upload/v1520868439/rrtw8mjav6q9ntjnysvkg.jpg",
            "reviews":[
              {
                "id":6,
                "content":"             ",
                "bookId":3,
                "userId":6,
                "caption":"  ",
                "createdAt":"2018-03-19T16:32:57.605Z",
                "updatedAt":"2018-03-19T16:32:57.605Z"
              },
            ],
            "favorited":
            [
              {
                "id":5,
                "createdAt":"2018-03-14T07:03:45.278Z",
                "updatedAt":"2018-03-14T07:03:45.278Z",
                "bookId":3,
                "userId":2
              },
            ]
        }
      }
    ],
    count: 1
  },

  unFavoriteResponse: {
    "message":"Never eat alone  has been removed from your favorite list",
    "book":
    {
      "id":3,
      "title":"Never eat alone "
    }
  },
  userProfileResponse: {
    message: 'Profile retrieved successfully',
    profile : {
      "firstName": "Obi",
      "id": 3,
      "image": "https://res.cloudinary.com/sardaunan/image/upload/v1520868439/rrtw8mjav6q9ntjnysvkg.jpg",
      "lastName": "Walker"
    }
  },
  editData: {
    "firstName": "Obinna",
    "image": ""
  },
  editProfileResponse: {
    profile: {
      "userId": 3,
      "role": "normal",
      "firstName": "Obinna",
      "lastName": "Walker",
      "image": ""
    },
    message: 'Your profile has been updated'
  },
  bookCount: 2,
  user: {  
    id: 3,
    role: 'normal',
    active: true,
    username: 'labake',
    email: 'labake.labs@gmail.com',
  },

  admin: {  
    id: 4,
    role: 'admin',
    active: true,
    username: 'keinzy',
    email: 'oreitanoyebola@gmail.com',
  }
}
