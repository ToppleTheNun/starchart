export function isPresent<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined && typeof x !== "undefined";
}

export function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}
