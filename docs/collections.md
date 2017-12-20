
Collection are one of the basic abstractions in UnsafeJS. Each collection
type should met following requirements:

```typescript
interface Collection<T> {
    get(index: number): T
    size(): number
}
```

and collection framework will attach following methods:
```typescript
interface CollectionExtension<T> {
    map(fn: T -> U): Collection<U>
    filter(fn: T -> boolean): Collection<T>
    skip(n: number): Collection<T>
    take(n: number): Collection<T>
    each(fn: T -> void): void
    toArray(): T[]
}
```

## Built-in collection creator

JavaScript have few kind of collections, including Array, NodeList, Object etc.

Unsafe JS provide a quick way to create collections based on JavaScript objects:

#### Array like collections:

Array like collection means JavaScript object implements following 2 methods:
```typescript
interface ArrayLike<T> {
    operator[](index: number): T
    get length: number
}
```

An example is String.

You can create an array-like collection by using:
```javascript
var _ = unsafe.load("collection");

_.arrayLike("hello, world");

_.take(1).toArray(); // => ["h"]
```

#### Item list collections:

Item list collections means JavaScript object implements following methods:
```typescript
interface ItemList<T> {
    item(index: number): T
    size(): number
}
```

An example is NodeList.

you can use `_.items` create a collection from an item list collection.

#### Object

You can also use `_.obj` to create a collection from a JavaScript object. Basically
it just enumerates all it's key-values within a associated object pair.

e.g.:
```javascript
_.obj({a: 1, undefined: 2}).toArray() // [{key: "a", value: 1}, {key: "undefined", value: 2}]
```

#### Ranges

You can also create continuous numeric array using `_.range`.

Range takes at most 3 parameters, and create a finite/infinite number sequences, you can see
from following use cases:

```javascript
_.range(10)   // [0, 1, ... 9]
_.range(-10)  // [0, -1, -2, ... -9]

_.range(2, 5) // [2, 3, 4]
_.range(5, 2) // [5, 4, 3]

_.range(0, 100, 3) // [0, 3, 6 ..., 99]

_.range(10, NaN) // [10, ...
_.range(10, NaN, 3) // [10, 13, 16, ...
_.range(10, NaN, -3) // [10, 7, 4, 1, -2 ...
```

You can truncate a infinite sequence by using "take" function.