export interface Identifiable { readonly id: string; }

export class Repository<T extends Identifiable> {
  private _store: Map<string, T> = new Map();

  add(item: T): void {
    if (this._store.has(item.id)) {
      throw new Error(`Item with id '${item.id}' already exists` );
    }

    this._store.set(item.id, item);
  }

  getById(id: string): T | undefined { return this._store.get(id);}

  getAll(): T[] { return Array.from( this._store.values()); }

  remove(id: string): boolean {  return this._store.delete(id);  }

  update( id: string,  changes: Partial<T>): T {
    const existing = this._store.get(id);

    if (!existing) {
      throw new Error(`Item with id '${id}' not found.` );
    }

    const updated = {...existing , ...changes, id: existing.id, } as T;
    this._store.set(id, updated);
    return updated;
  }

  count(): number {  return this._store.size;}

  find( predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }
}