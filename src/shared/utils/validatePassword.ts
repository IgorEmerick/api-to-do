export function validatePassword(password: string): boolean {
  return (
    password.length >= 8 &&
    password.length <= 16 &&
    /^([a-zA-Z !@#$%^&*()\-_+=,.<>?/~0-9]+)$/g.test(password) &&
    /([ !@#$%^&*()\-_+=,.<>?/~])/g.test(password) &&
    /([a-z])/g.test(password) &&
    /([A-Z])/g.test(password) &&
    /([0-9])/g.test(password)
  );
}
