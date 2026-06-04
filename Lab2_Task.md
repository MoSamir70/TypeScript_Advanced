# TypeScript Lab: Classes & Generics

---

## Rules

- Do not use `any` anywhere. If TypeScript can't infer something, annotate it explicitly.
- Every setter must validate its input and throw a descriptive `Error` on failure.
- Every file should compile with zero TypeScript errors.
- Do not copy code between labs. Each lab builds on the last, but re-type it.

---

## Part 1 — Classes

---

### Lab 1.1 — Abstract Base Class: `Employee`

Build an abstract class `Employee` with the following specification:

**Properties:**

| Property      | Access            | Type     |
| ------------- | ----------------- | -------- |
| `employeeId`  | `public readonly` | `string` |
| `_name`       | `protected`       | `string` |
| `_baseSalary` | `protected`       | `number` |
| `_department` | `private`         | `string` |

**Constructor:** accepts `(employeeId: string, name: string, baseSalary: number, department: string)`

**Getters and Setters:**

- `name` — getter only, returns `_name`
- `department` — getter + setter. Setter only allows: `"engineering"`, `"sales"`, `"hr"`, `"finance"`. Throws `Error` for anything else.

**Abstract Methods:**

- `getRole(): string`
- `calculateBonus(): number`

**Concrete Method:**

- `getPayslip(): string`

Format it exactly like this:

```
[Full-Time] Alice (ID: e-001) | Dept: engineering | Base: $90000 | Bonus: $9000 | Total: $99000
```

Use `getRole()` and `calculateBonus()` internally so subclasses automatically get the right output without overriding this method.

---

### Lab 1.2 — Subclasses: `FullTimeEmployee` and `Contractor`

**`FullTimeEmployee extends Employee`**

Additional private property:

- `_bonusMultiplier: number` — must be between `0.05` and `0.50` inclusive. Enforce this in the setter.

Constructor: `(employeeId, name, baseSalary, department, bonusMultiplier)`

- `getRole()` returns `"Full-Time"`
- `calculateBonus()` returns `_baseSalary * _bonusMultiplier`
- `promote(newSalary: number, newMultiplier: number): void` — updates both values using setters. Do not assign to backing fields directly.

---

**`Contractor extends Employee`**

Additional private properties:

- `_hourlyRate: number` — must be `> 0`
- `_hoursWorked: number` — must be `>= 0`

Constructor: `(employeeId, name, department, hourlyRate, hoursWorked)`

Compute `baseSalary` as `hourlyRate * hoursWorked` and pass it to `super()`.

- `getRole()` returns `"Contractor"`
- `calculateBonus()` returns `0`
- `logHours(additionalHours: number): void` — validates `additionalHours > 0`, adds to `_hoursWorked`, then recomputes and updates `_baseSalary` using the setter

---

### Lab 1.3 — Polymorphism

1. Create `const team: Employee[]` with at least 2 `FullTimeEmployee` instances and 1 `Contractor`.
2. Use `forEach` to print every payslip.
3. Try to instantiate `Employee` directly. Write a comment explaining the TypeScript error and why abstract classes produce it.

**Expected console output (example values):**

```
[Full-Time] Alice (ID: e-001) | Dept: engineering | Base: $90000 | Bonus: $9000 | Total: $99000
[Full-Time] Bob (ID: e-002) | Dept: sales | Base: $70000 | Bonus: $7000 | Total: $77000
[Contractor] Carol (ID: e-003) | Dept: hr | Base: $48000 | Bonus: $0 | Total: $48000
```

---

## Part 2 — Generics

---

### Lab 2.1 — Generic Stack

Implement a generic class `Stack<T>` from scratch.

**Required members:**

| Member    | Signature         | Notes                                                                    |
| --------- | ----------------- | ------------------------------------------------------------------------ |
| `_items`  | `private T[]`     | Initialized as `[]`                                                      |
| `push`    | `(item: T): void` | Adds to top                                                              |
| `pop`     | `(): T`           | Removes and returns top. Throws `Error("Stack is empty.")` if empty      |
| `peek`    | `(): T`           | Returns top without removing. Throws `Error("Stack is empty.")` if empty |
| `isEmpty` | `(): boolean`     |                                                                          |
| `size`    | `(): number`      |                                                                          |
| `toArray` | `(): T[]`         | Returns a shallow copy, not the original reference                       |

**Test cases to run:**

Test 1 — `Stack<number>`:

- Push `10`, `20`, `30`
- Log `peek()` — should be `30`
- Call `pop()` twice and log each result
- Log `size()` — should be `1`

Test 2 — `Stack<string>`:

- Push `"a"`, `"b"`, `"c"`
- Pop all three
- Try a 4th `pop()` inside a `try/catch` and log the error message

---

### Lab 2.2 — Generic Utility Functions

Write two standalone generic functions:

**a. `getProperty`**

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K];
```

Returns the value at `obj[key]`. TypeScript should prevent passing a key that doesn't exist on `T` at compile time.

Test it with an object `{ id: "u-1", username: "yehia", age: 28 }` — retrieve each field separately. Then try passing a key `"email"` that doesn't exist and record the compiler error in a comment.

**b. `groupBy`**

```typescript
function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]>;
```

Groups an array of objects by the value of a given key. Each unique value of `items[n][key]` becomes a key in the returned object, mapping to an array of all items that share that value.

Test with an array of at least 6 objects that have a `department: string` field, producing at least 3 distinct groups. Log the full result.

---

## Part 3 — Combined: Generics + Inheritance

---

### Lab 3.1 — Generic Repository

Build a typed, in-memory data store.

**Interface:**

```typescript
interface Identifiable {
	readonly id: string;
}
```

**Class `Repository<T extends Identifiable>`:**

| Member    | Signature                                | Notes                                                                                                                                                              |
| --------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_store`  | `private Map<string, T>`                 | Initialized as `new Map()`                                                                                                                                         |
| `add`     | `(item: T): void`                        | Throws `Error` if `id` already exists                                                                                                                              |
| `getById` | `(id: string): T \| undefined`           | Returns `undefined` if not found                                                                                                                                   |
| `getAll`  | `(): T[]`                                | Returns all values as an array                                                                                                                                     |
| `remove`  | `(id: string): boolean`                  | Returns `true` if deleted, `false` if not found                                                                                                                    |
| `update`  | `(id: string, changes: Partial<T>): T`   | Merges `changes` into the existing entry and returns the updated value. Throws if id not found. Must not allow `id` to be changed even if it appears in `changes`. |
| `count`   | `(): number`                             |                                                                                                                                                                    |
| `find`    | `(predicate: (item: T) => boolean): T[]` | Returns all items matching the predicate                                                                                                                           |

**Hint for `update`:** use spread and explicitly re-stamp the id:

```typescript
const updated = { ...existing, ...changes, id: existing.id } as T;
```

**Create `Product` implementing `Identifiable`:**

```typescript
class Product implements Identifiable {
	readonly id: string;
	name: string;
	price: number;
	category: string;
	// constructor...
}
```

**Test every method:**

1. Add 5 products across at least 2 categories
2. Try adding a duplicate id and catch the thrown error
3. Get a product by id and log it
4. Update a product's price, log the returned updated object
5. Remove a product, confirm `count()` decreases
6. Use `find()` to get all products with `price > 50`
7. Call `getById` with a non-existent id and log the result

---
