import { StringHelper } from './htmlwriter.utils';

export class StringBuilder {
  _string: string = '';

  constructor(aString: string) {
    this.append(aString);
  }

  isEmpty(): boolean {
    return StringHelper.StringIsEmpty(this._string);
  }

  append(aString: string | undefined): StringBuilder {
    if (aString) {
      this._string += aString;
    }
    return this;
  }

  toString(): string {
    return this._string;
  }

  clear(): StringBuilder {
    this._string = '';
    return this;
  }
}
