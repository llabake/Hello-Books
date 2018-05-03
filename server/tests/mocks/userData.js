const userDataTest = {
  validUser1: {
    username: 'keinzy',
    email: 'oyebola.otin@gmail.com',
    password: 'password',
    firstName: 'oyebola',
    lastName: 'ayinla',
    confirmpassword: 'password'
  },
  validUser2: {
    username: 'solape',
    email: 'damywuraola@gmail.com',
    password: 'damola',
    confirmpassword: 'damola',
    firstName: 'adedamola',
    lastName: 'wuraola'
  },
  validUser3: {
    username: 'flakky',
    firstName: 'Folake',
    lastName: 'Okoya',
    email: 'flakykitchen@hotmail.com',
    password: 'tobi',
    confirmpassword: 'tobi',
    role: 'admin',
  },
  validUser4: {
    username: 'mama',
    firstName: 'Anne',
    lastName: 'Oriola',
    email: 'olamideoriola@gmail.com',
    password: 'yomi',
    confirmpassword: 'yomi',
    role: 'admin',
  },
  validUser5: {
    username: 'robocop',
    firstName: 'Kachi',
    lastName: 'Okereke',
    email: 'kachi@hotmail.com',
    password: 'kach',
    role: 'normal',
  },
  validUser6: {
    username: 'messi',
    firstName: 'lionel',
    lastName: 'messi',
    email: 'messi@hotmail.com',
    password: 'messi',
    role: 'normal',
  },
  validUser7: {
    username: 'andela',
    firstName: 'jeremy',
    lastName: 'johnsomn',
    email: 'andela@hotmail.com',
    password: 'andela',
    role: 'normal',
  },
  validUser8: {
    username: 'tunmise',
    firstName: 'ogunniyi',
    lastName: 'tunmise',
    email: 'tunmise@hotmail.com',
    password: 'tunmise',
    role: 'normal',
  },
  validUser9: {
    username: 'samuel',
    firstName: 'samuel',
    lastName: 'abudu',
    email: 'abudu@hotmail.com',
    password: 'samuel',
    role: 'normal',
  },
  userWithWrongFieldFormat: {
    "username": "mama@",
    "firstName": " ",
    "lastName": "Oriola",
    "email": "olamideoriola.com",
    "password": "yomi",
  },
  userWithNoFields: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  misMatchPassword: {
    username: 'mama',
    firstName: 'Anne',
    lastName: 'Oriola',
    email: 'olamideoriola@gmail.com',
    password: 'yomi',
    confirmpassword: 'yoomi',
    role: 'admin',
  },
  validUserSignIn1: {
    username: 'mama',
    password: 'yomi'
  },
  validUserSignIn2: {
    username: 'flakky',
    password: 'tobi'
  },
  validUserSignIn3: {
    username: 'keinzy',
    password: 'password'
  },
  validUserSignIn4: {
    username: 'solape',
    password: 'damola'
  },
  invalidUserSignIn1: {
    username: '',
    password: 'password'
  },
  invalidUserSignIn2: {
    username: 'solape',
    password: ''
  },
  invalidUserSignIn3: {
    username: 'solape',
    password: 'incorrect'
  },
  userWithBlankUsernameAndPassword: {
    username: '',
    password: '',
  },
  wrongUserSignInCredentials1: {
    username: 'desmond',
    password: 'password'
  },
  wrongUserSignInCredentials2: {
    username: 'keinzy',
    password: 'tobi'
  },
  editDetail: {
    username: "oyebola",
    email: 'oyebola.oreitan@gmail.com',
    password: 'oluseye',
    firstName: 'oyebola',
    lastName: 'Oreitan',
    confirmpassword: 'password'
  },
  normalUser: {
    username: 'keinzy',
    email: 'oyebola.otin@gmail.com',
    password: 'password',
    firstName: 'oyebola',
    lastName: 'ayinla',
    confirmpassword: 'password'
  },
  normalUser1: {
    username: 'solape',
    email: 'damywuraola@gmail.com',
    password: 'damola',
    firstName: 'adedamola',
    lastName: 'wuraola',
    confirmpassword: 'damola'
  },
  adminUser: {
    username: 'flakky',
    email: 'flakkykitche@gmail.com',
    password: 'tobi',
    firstName: 'Folake',
    lastName: 'Onamusi',
    confirmpassword: 'tobi',
    role: 'admin'
  },
  adminUser1: {
    username: 'kech',
    email: 'nkechiokoye@gmail.com',
    password: 'kingsley',
    firstName: 'Nkechi',
    lastName: 'Okoye',
    confirmpassword: 'kingsley',
    role: 'admin'
  },
  adminUser2: {
    username: 'ramlah',
    email: 'bra@gmail.com',
    password: 'dieko',
    firstName: 'Ramlah',
    lastName: 'Babatunde',
    confirmpassword: 'dieko',
    role: 'admin'
  },
  user1: {
    username: 'keinzy',
    email: 'oyebola.otin@gmail.com',
    password: 'password',
    firstName: 'oyebola',
    lastName: 'ayinla',
    confirmpassword: 'password'
  },
  user2: {
    username: 'solape',
    email: 'damywuraola@gmail.com',
    password: 'damola',
    confirmpassword: 'damola',
    firstName: 'adedamola',
    lastName: 'wuraola'
  },
  user3: {
    username: 'peju',
    email: 'pejupopoola@gmail.com',
    password: 'olaolegan',
    confirmpassword: 'olaolegan',
    firstName: 'adepeju',
    lastName: 'popoola',
    role: 'admin'
  },
  userWithWrongSignInFormat: {
    username: '#$%%^^!WEDX',
    password: 'abdcfghhhfjsjfjjsfkhuewibsdfiouhianlfhuiejkfiohfkj'
  }
};

export default userDataTest;