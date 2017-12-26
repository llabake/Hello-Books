
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

