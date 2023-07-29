export const validRegister = userRegister => {
  const { email, fname, lname, password, confirmPassword } = userRegister;
  const errors = [];
  const lowerCase = /[a-z]/g;
  const upperCase = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!validateEmail(email)) {
    errors.push('Email invalid!');
  }
  if (fname.length > 15) {
    errors.push('First name should not be exceed 15 characters!');
  }
  if (fname.match(numbers) || fname.match(specialCharacters)) {
    errors.push('First name only contains alphabet characters and spaces!');
  }

  if (lname.length > 15) {
    errors.push('Last name should not be exceed 15 characters!');
  }
  if (lname.match(numbers) || lname.match(specialCharacters)) {
    errors.push('Last name only contains alphabet characters and spaces!');
  }

  if (!password.match(lowerCase)) {
    errors.push('Password should contains lowercase letters!');
  }
  if (!password.match(upperCase)) {
    errors.push('Password should contain uppercase letters!');
  }
  if (!password.match(numbers)) {
    errors.push('Password should contains numbers!');
  }
  if (password.length < 6) {
    errors.push('Password length should be more than 6 characters!');
  }
  if (password.length > 20) {
    errors.push('Password length should be less than 20 characters!');
  }
  if (!password.match(specialCharacters)) {
    errors.push('Password must have spacial characters!');
  }
  if (password !== confirmPassword) {
    errors.push('Confirm password did not match!');
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
