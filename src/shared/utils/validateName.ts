export function validateName(name: string): boolean {
  return /^([a-zA-Z])([a-zA-Z ]*)([a-zA-Z])$/g.test(name);
}
