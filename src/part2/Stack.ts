class Stack<T> {
  private _items: T[] = [];

  push(item: T): void { this._items.push(item);}

  pop(): T { 
    if (this.isEmpty()) {  throw new Error("Stack is empty");}

    return this._items.pop() as T;
  }

  peek(): T {
     if (this.isEmpty()) { throw new Error("Stack is empty"); }

    return this._items[this._items.length - 1] as T;
  }

  isEmpty(): boolean { return this._items.length === 0;}

  size(): number { return this._items.length; }

  toArray(): T[] {  return [...this._items]; }
}

export default Stack;