export class Stack<T> {
  private _items: T[] = [];

  public push(item: T): void {
    this._items.push(item);
  }

  public pop(): T | undefined {
    return this._items.pop();
  }

  public isEmpty(): boolean {
    return this._items.length === 0;
  }

  public peek(): T | undefined {
    return this._items[this._items.length - 1];
  }
}
