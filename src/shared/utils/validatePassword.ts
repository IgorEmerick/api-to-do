export function validatePassword(password: string): boolean {
  return (
    /^[a-zA-Z0-9!@#$%^&*()_+=/? ,.<>:;[{\]}|~-]{8,16}$/g.test(password) &&
    /[!@#$%^&*()_+=/? ,.<>:;[{\]}|~-]/g.test(password) &&
    /[a-z]/g.test(password) &&
    /[A-Z]/g.test(password) &&
    /[0-9]/g.test(password)
  );
}
