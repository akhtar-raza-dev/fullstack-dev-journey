//! Const Arrays -
// Const Arrays - improved explanation and examples
// -------------------------------------------------
// Key idea: `const` prevents reassigning the variable binding, not modification of the value.
// - If the value is a primitive (number/string/boolean), it cannot change.
// - If the value is an object or array, the reference is constant, but the contents are mutable.
// In short: you cannot make `arr = anotherArray` when `arr` is declared with `const`,
// but you can call methods that change the contents (push, pop, splice, etc.).

// Use `let` or `const` to avoid creating implicit globals. `arr1` below is declared with `let`.
let arr1 = [1, 2, 3];
const arr = [1, 2, 3];

// The following reassignments would throw if uncommented (TypeError):
// arr = [4, 5, 6];    // TypeError: Assignment to constant variable.
// arr = arr1;         // TypeError as well — cannot change the binding held by `arr`.

// However, you can change the elements inside the array because the internal object is mutable.
// `arr2` is not a copy — it points to the exact same array object as `arr`.
let arr2 = arr; // arr2 and arr reference the same array object

console.log('arr2 (initial):', arr2); // [1, 2, 3]

arr2.push(4); // modifies the shared array object
console.log('arr2 (after push):', arr2); // [1, 2, 3, 4]
console.log('arr (after push):', arr);   // [1, 2, 3, 4]

// If you need a new array (a different reference) that copies the values, create a shallow copy:
const arrCopy = [...arr]; // spread creates a new array with the same element
//!  or const arrCopy = arr.slice(); // slice also creates a new array with the same elements
console.log('arrCopy (separate reference):', arrCopy); // [1, 2, 3, 4]

// Mutating the original array does not change `arrCopy` because it's a different object:
arr.splice(0, 4); // remove all items from the original array
console.log('arr (after splice):', arr);      // []
console.log('arrCopy (unchanged):', arrCopy); // [1, 2, 3, 4]

// Plain-English summary (short):
// - `const arr = ...` means "arr will always reference the same array object".
// - Methods like push/splice change that object; they are allowed.
// - To get a completely separate array (different reference), copy it (e.g., spread, slice).
