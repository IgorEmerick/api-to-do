export function validateEmail(email: string): boolean {
  return /^([a-zA-Z])([a-zA-Z0-9-_.])*(@)([a-zA-Z0-9-_])+(\.([a-zA-Z0-9-_])+)+$/g.test(
    email,
  );
}
