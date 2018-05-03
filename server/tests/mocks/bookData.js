const bookDataTest = {
  book1: {
    title: 'so long a letter',
    author: 'mariam ba',
    isbn: 65486565091,
    quantity: 56,
    publishedYear: 2009,
    description: 'a book a family',
    aboutAuthor: 'about the author',
    
  },
  book2: {
    title: 'zero to hero',
    author: 'eric reis',
    isbn: 6268752626437,
    quantity: 55,
    publishedYear: 2012,
    description: '8752626',
    aboutAuthor: 'about the author',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41mbSg-W6-L._SY344_BO1,204,203,200_.jpg'
  },
  validBook1: {
    title: 'fine boys',
    author: 'ehabsuen',
    isbn: 8655758493029,
    quantity: 6,
    publishedYear: 2015,
    aboutAuthor: 'about the author',
    description: 'juvenile adventure'
  },
  validBook2: {
    title: 'There Was A Country',
    author: 'Chinua Achebe',
    isbn: 6855758493029,
    quantity: 56,
    publishedYear: 2008,
    aboutAuthor: 'about the author',
    description: 'a book on nation building'
  },
  validBook3: {
    title: 'Lean Start Up',
    author: 'Eric Reis',
    isbn: 7685655612098,
    quantity: 6,
    publishedYear: 2015,
    aboutAuthor: 'about the author',
    description: 'a start up book'
  },
  validBook4: {
    title: 'Lean Up',
    author: 'Erica Reis',
    isbn: 5485655612098,
    quantity: 6,
    publishedYear: 2010,
    aboutAuthor: 'about the author of the book',
    description: 'a start up book on book'
  },
  emptyBookDetail: {},
  zeroQuantity: {
    title: 'Alapata Apata',
    author: 'Wole Soyinka',
    isbn: '8655758493029',
    quantity: 0,
    publishedYear: '2009',
    aboutAuthor: 'about the author',
    description: 'a book a family'
  },
  stringQuantity: {
    title: 'Alapata Apata',
    author: 'Wole Soyinka',
    isbn: 8655758493029,
    quantity: 'pj',
    publishedYear: 2009,
    aboutAuthor: 'about the author',
    description: 'a book a family'
  },
  stringIsbnAndPublishedYear: {
    title: 'Alapata Apata',
    author: 'Wole Soyinka',
    aboutAuthor: 'about the author',
    isbn: '@=p',
    quantity: 8,
    publishedYear: 'p@}}',
    description: 'a book a family'
  },
  bookUpdate: {
    title: 'Country',
    author: 'Chinua'
  },
  bookUpdateIsbn: {
    isbn: 865275
  },
  book3: {
    title: 'The secret life of baba segi wife',
    author: 'Lola Soneyin',
    isbn: 565,
    quantity: 0,
    publishedYear: 2009,
    aboutAuthor: 'about the author',
    description: 'a book a family'
  },
  suggestedBook1: {
    title: 'suggested book title',
    author: 'suggested book author'
  },
  suggestedBook2: {
    title: 'suggested book title2',
    author: 'suggested book author2'
  }
};

export default bookDataTest;