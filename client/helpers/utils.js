
export const isEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const isAlphanumeric = (str) => {
  const re = /^([0-9]|[a-z])+([0-9a-z]*)$/i;
  return re.test(str);
};

export const isNumeric = (str) => {
  const re = /^([0-9])+$/i;
  return re.test(str);
};

export const isStrong = (str) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
  return re.test(str);
}

export  const isYear = (str) => {
  const re = /^[1-9][0-9]{3}$/i;
  return re.test(str);
};

// export const hostUrl = 'https://myhellobooks.herokuapp.com' 


export const hostUrl = process.env.NODE_ENV === 'production' ?
  'https://myhellobooks.herokuapp.com' :
  'http://localhost:5000';

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user')) || {}
}

export const bookDefaultImage = 'https://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png';

export const maxPageLimit = process.env.MAX_PAGE_LIMIT || 4;

export const checkFavorited = (book, user) => {
  if (!book.favorited || !book.favorited.length) {
    return false;
  }
  for (const favorite of book.favorited ) {
    if (favorite.user.id === user.id) {
      return true;
    }
  }
  return false;
}

export const checkReviewed = (book, user) => {
  if (!book.reviews || !book.reviews.length) {
    return false;
  }
  for (const review of book.reviews ) {
    if (review.user.id === user.id) {
      return true;
    }
  }
  return false;
}

export const checkUpVote = (book, user) => {
  if (!book.votes || !book.votes.length) {
    return false;
  }
  
  for (const vote of book.votes ) {
    if (vote.user.id === user.id) {
      if ( vote.voteType === 'upVote') {
        return true;
      }
      return false
    }
  }
  return false;
}

export const checkDownVote = (book, user) => {
  if (!book.votes || !book.votes.length) {
    return false;
  }
  
  for (const vote of book.votes ) {
    if (vote.user.id === user.id) {
      if ( vote.voteType === 'downVote') {
        return true;
      }
      return false
    }
  }
  return false;
}