export function validateUuid(uuid: string): boolean {
  return /^([0-9a-z]{8})((-([0-9a-z]{4})){3})-([0-9a-z]{12})$/gi.test(uuid);
}
