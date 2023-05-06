export function validateName(name: string): boolean {
  return /^([a-z-_])([a-z-_ ]*)([a-z-_])$/gi.test(name);
}
