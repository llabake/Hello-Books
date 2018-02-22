
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

export const hostUrl = 'https://myhellobooks.herokuapp.com' 


// export const hostUrl = process.env.NODE_ENV === 'production' ?
//   'https://myhellobooks.herokuapp.com' :
//   'http://localhost:5000';

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user')) || {}
}

export const bookDefaultImage = 'http://res.cloudinary.com/sardaunan/image/upload/v1518354032/book-default-image_e8nj1p.png';