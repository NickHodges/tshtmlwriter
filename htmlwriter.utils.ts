export class StringHelper {
  static StringIsEmpty(aString: string): boolean {
    return aString === undefined || aString === null || aString === '';
  }

  static StringIsNotEmpty(aString: string): boolean {
    return !this.StringIsEmpty(aString);
  }

  static StringIsEmptyWithTrim(aString: string): boolean {
    return aString === undefined || aString === null || aString === '' || aString.trim() === '';
  }

  static StringIsNotEmptyWithTrim(aString: string): boolean {
    return !this.StringIsEmptyWithTrim(aString);
  }
}

export class TagMaker {
  static MakeOpenTag(aTag: string): string {
    return `<${aTag}>`;
  }

  static MakeCloseTag(aTag: string): string {
    return `</${aTag}>`;
  }

  static MakeSlashCloseTag(): string {
    return ' />';
  }

  static MakeCommentCloseTag(): string {
    return ' -->';
  }
}
