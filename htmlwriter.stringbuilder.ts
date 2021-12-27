import { StringHelper } from './htmlwriter.utils';

export class StringBuilder {
  _string: string = '';

  constructor(aString: string) {
    this.append(aString);
  }

  IsEmpty(): boolean {
    return StringHelper.StringIsEmpty(this._string);
  }

  append(aString: string): StringBuilder {
    if (aString) {
      this._string += aString;
    }
    return this;
  }

  ToString(): string {
    return this._string;
  }

  Clear(): StringBuilder {
    this._string = '';
    return this;
  }
}
