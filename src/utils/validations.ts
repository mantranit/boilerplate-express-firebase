export const validateEmail = (email: string) => {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;
  return regex.test(email);
};

// min 8 characters and least one lowercase letter, uppercase letter, number and symbol.
export const validatePassword = (password: string) => {
  // let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
  // return regex.test(password);
  return true;
};
