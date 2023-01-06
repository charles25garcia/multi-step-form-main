export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isBlank(text: string) {
  return text.trim() === '';
}

export function isValidPhoneNumber(text: string) {
  return text.trim().length === 10;
}