export function StringIsEmpty(aString: string): boolean {
  return aString === undefined || aString === null || aString === '';
}

export function StringIsNotEmpty(aString: string): boolean {
  return !(StringIsEmpty(aString));
}

export function StringIsEmptyWithTrim(aString: string): boolean {
  return aString === undefined || aString === null || aString === '' || aString.trim() === '';
}

export function StringIsNotEmptyWithTrim(aString: string): boolean {
  return !(StringIsEmptyWithTrim(aString));
}
