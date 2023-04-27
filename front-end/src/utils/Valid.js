export const validRegister = userRegister => {
  const { username, phone, email, password, confirmPassword, fullname } =
    userRegister;
  const errors = [];
  const lowerCase = /[a-z]/g;
  const upperCase = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!fullname) {
    errors.push('Fullname must be required');
  } else if (username.length < 3) {
    errors.push('Username should be greater than 3 characters');
  } else if (email === '') {
    errors.push('Email must be required');
  } else if (phone === '') {
    errors.push('Phone must be required');
  } else if (phone.length !== 10) {
    errors.push('Phone must have 10 numbers');
  } else if (
    phone[0] !== '0' ||
    (phone[1] !== '3' &&
      phone[1] !== '5' &&
      phone[1] !== '7' &&
      phone[1] !== '8' &&
      phone[1] !== '9')
  ) {
    errors.push('Phone number invalid');
  } else if (!password.match(lowerCase)) {
    errors.push('Password should contains lowercase letters!');
  } else if (!password.match(upperCase)) {
    errors.push('Password should contain uppercase letters!');
  } else if (!password.match(numbers)) {
    errors.push('Password should contains numbers!');
  } else if (password.length < 8) {
    errors.push('Password length should be more than 8.');
  } else if (!password.match(specialCharacters)) {
    errors.push('Password must have spacial characters');
  } else if (!validateEmail(email)) {
    errors.push('Email invalid');
  } else if (checkPassword(password, confirmPassword)) {
    errors.push(checkPassword(password, confirmPassword));
  }

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export const validInfo = info => {
  const { username, phone, email, fullname } = info;
  const errors = [];
  if (!fullname) {
    errors.push('Fullname must be required');
  } else if (username.length < 3) {
    errors.push('Username should be greater than 3 characters');
  } else if (email === '') {
    errors.push('Email must be required');
  } else if (phone === '') {
    errors.push('Phone must be required');
  } else if (phone.length !== 10) {
    errors.push('Phone must have 10 numbers');
  } else if (
    phone[0] !== '0' ||
    (phone[1] !== '3' &&
      phone[1] !== '5' &&
      phone[1] !== '7' &&
      phone[1] !== '8' &&
      phone[1] !== '9')
  ) {
    errors.push('Phone number invalid');
  }

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const checkPassword = (password, cf_password) => {
  if (password.length < 6) {
    return 'Password must be at least 6 chars.';
  } else if (password !== cf_password) {
    return 'Confirm password did not match.';
  }
};
