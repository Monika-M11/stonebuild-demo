// validationPatterns.ts

export const patterns = {
  email: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },

  phone: {
    value: /^[0-9]{10}$/,
    message: "Enter valid 10 digit phone number",
  },

  onlyNumbers: {
    value: /^[0-9]+$/,
    message: "Only numbers allowed",
  },

  onlyAlphabets: {
    value: /^[A-Za-z\s]+$/,
    message: "Only alphabets allowed",
  },

  alphanumeric: {
    value: /^[A-Za-z0-9]+$/,
    message: "Only letters and numbers allowed",
  },
   password: {
    value:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
    message:
      "Password must contain minimum 7 characters, letters, numbers and special characters",
  },
};