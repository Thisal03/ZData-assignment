export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const validatePassword = (password) => password.length >= 6;
export const validateFullName = (name) => name.trim().length > 0;