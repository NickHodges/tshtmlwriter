

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