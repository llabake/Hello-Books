import jwt from 'jsonwebtoken';

export const isEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const isAlphanumeric = (str) => {
  const re = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
  return re.test(str);
};

export const isNumeric = (str) => {
  const re = /^([0-9])+$/i;
  return re.test(str);
};

/**
   *
   * @description: generate a login token
   * @param {Object} user payload to generate token
   * @returns {String} the gnerated token
   */
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
        active: user.active
      }
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  return token;
};

export const sortBooksByTopFavorites = ( books ) => {
  books.sort((book1, book2) => {
    if (book1.favorited.length < book2.favorited.length) {
      return 1
    } else if (book1.favorited.length > book2.favorited.length) {
      return -1
    } else {
      return 0
    }
  });
  return books;
}

export const trimObject = (obj) => {
  const trimmedObject = {}
  Object.keys(obj).forEach((key) => {
    trimmedObject[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key]
  })
  return trimmedObject;
}

