import jwt from 'jsonwebtoken';

const secret = 'mySecret';

export const isEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const isAlphanumeric = (str) => {
  const re = /^([0-9]|[a-z])+([0-9a-z]+)$/i;
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
    secret,
    { expiresIn: '24h' }
  );
  return token;
};
