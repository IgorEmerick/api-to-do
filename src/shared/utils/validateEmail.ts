export function validateEmail(email: string): boolean {
  return /^([a-zA-Z0-9-_.]+)(@)([a-zA-Z-_]+)((\.[a-zA-Z-_]+)+)$/g.test(email);
}
