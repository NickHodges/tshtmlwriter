export class NoClosingTagHTMLWriterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoClosingTagHTMLWriterError';
  }
}

export class TryingToCloseClosedTagError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TryingToCloseClosedTagError';
    Object.setPrototypeOf(this, TryingToCloseClosedTagError.prototype);
  }
}

export class NotInHeadTagError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotInHeadTagError';
    Object.setPrototypeOf(this, NotInHeadTagError.prototype);
  }
}

export class NotInCommentTagError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotInCommentTagError';
    Object.setPrototypeOf(this, NotInComentTagError.prototype);
  }
}

