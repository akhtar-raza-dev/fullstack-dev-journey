//! Array Methods
//? Array methods allow you to manipulate arrays without mutating the original (some methods) or by mutating in place (others).
//? Like string methods, array methods support chaining - calling multiple methods in a single expression.
//? Example: array.reverse().indexOf(value) chains reverse() and indexOf() together.
let name = ["ak", "sam", "ravi"];
console.log(name.reverse().indexOf("ak")); // Output: 2

//todo 1 push() - MUTATES. Adds elements to the end of the array.
let arr = [1, 2, 3];
arr.push(4);
console.log(arr)

//todo 2 pop() - MUTATES. Removes the last element of the array.
let lastElement = arr.pop();
console.log(arr);

//todo 3 unshift() - MUTATES. Adds elements to the beginning of the array.
arr.unshift(-1, 0);
console.log(arr);

//todo 4 shift() - MUTATES. Removes the first element of the array.
let firstElement = arr.shift();
console.log(arr);

//todo 5 indexOf("element") - DOES NOT mutate. Returns the index of first occurrence of the element, or -1 if not found.
let arr1 = [1, 2, 3, 2, 5, 6, 7, 2, 9];
console.log(arr1.indexOf(2)); // Output: 1
//todo 6 lastIndexOf("element") - DOES NOT mutate. Returns the index of last occurrence of the element, or -1 if not found.
console.log(arr1.lastIndexOf(2)); // Output: 7

//todo 7 includes("element") - DOES NOT mutate. Checks if element exists in the array.
console.log(arr1.includes(2)); // Output: true
console.log(arr1.includes(10)); // Output: false

//todo 8 concat(...arrays) - DOES NOT mutate. Joins arrays together into a new array.
let arr2 = [8, 9, 10];
let arr3 = ['Akhtar', 'raza'];
console.log(arr1.concat(arr2, arr3)); // Output: [1, 2, 3, 2, 5, 6, 7, 2, 9, 8, 9, 10, 'Akhtar', 'raza']
//? Original arrays remain unchanged
console.log(arr2); // Output: [8, 9, 10]
console.log(arr3); // Output: ['Akhtar', 'raza']
arr1 = arr1.concat(arr2, arr3);
console.log(arr1); // Output: [1, 2, 3, 2, 5, 6, 7, 2, 9, 8, 9, 10, 'Akhtar', 'raza']

//todo 9 reverse() - MUTATES. Reverses the order of elements in the array.
console.log(arr1.reverse());

//todo 10 slice(start, end) - DOES NOT mutate. Extracts a portion of the array from start to end (end not included) and return new array.
let colors = ['red', 'green', 'blue', 'yellow', 'purple'];
console.log(colors.slice()); // Output: ['red', 'green', 'blue', 'yellow', 'purple']
console.log(colors.slice(2)); // Output: ['blue', 'yellow', 'purple']
console.log(colors.slice(2, 3)); // Output: ['blue'] (end index is not included)
console.log(colors.slice(-2)); // Output: ['yellow', 'purple']
console.log(colors.slice(10)); // Output: [] (empty array if start index is out of bounds)

//todo 11 splice(start, deleteCount, ...elements) - MUTATES. Adds, removes, or replaces elements in the array.
let fruits = ['apple', 'banana', 'orange', 'grape'];
console.log(fruits.splice(1, 2)); // Output: ['banana', 'orange']
console.log(fruits);
console.log(fruits.splice(0, 0, 'kiwi', 'mango')); // Output: [] (no elements removed, just added)
console.log(fruits);
console.log(fruits.splice(3, 1, 'pear')); // Output: ['grape']
console.log(fruits);

//todo 12 sort() - MUTATES. Sorts elements in the array, by default as strings in ascending order.
console.log(fruits.sort()); // Output: ['apple', 'kiwi', 'mango', 'pear']

//? WARNING: sort() sorts numbers as strings, not numerically. Use sort((a, b) => a - b) for correct numeric sorting.
let num = [2,4,5,3,20];
console.log(num.sort()); // Output: [2, 20, 3, 4, 5] (sorted as strings, not numbers )
//! for numeric sorting
console.log(num.sort((a, b) => a - b)); // for ascending order
console.log(num.sort((a, b) => b - a)); // for descending order


//! Iterative methods: forEach, map, filter, reduce
//? These methods are used to iterate over arrays.

// forEach(callback) - Iterates over each element and runs callback. DOES NOT return a new array.
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 22 }
];
users.forEach(user => console.log(user.name)); //! here is output because we console it ==> Alice, Bob, Charlie
users.forEach(user => {  }); //! No output, as callback does not return anything

// map(callback) - Transforms each element and returns a new array. DOES NOT mutate the original.
const names = users.map(user => user.name.toUpperCase());
console.log(names); // ['ALICE', 'BOB', 'CHARLIE']

// filter(callback) - Keeps elements that match the predicate and returns a new array. DOES NOT mutate the original.
const adults = users.filter(user => user.age >= 25);
console.log(adults); // [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]

// reduce(callback, initialValue of accumulator) - Reduces array to a single value. DOES NOT mutate the original.
const totalAge = users.reduce((acc, user) => acc + user.age, 0);
console.log(totalAge); // 77

//todo Quick differences & when to use:
// - forEach: use it for side effects; does not return a usable value (returns undefined).
// - map: use to transform every item into a new array of the same length.
// - filter: use to select a subset of items into a new array.
// - reduce: use to combine items into a single value (number, object, etc.).

// Chaining examples:
// - Transform then filter: array.map(...).filter(...)
const upperAdults = users.map(u => ({ name: u.name.toUpperCase(), age: u.age })).filter(u => u.age >= 25);
console.log(upperAdults); // [{name: 'ALICE', age:25}, {name: 'BOB', age:30}]

//todo 13 find(callback) - DOES NOT mutate. Returns the first element that matches the condition.
const firstAdult = users.find(user => user.age >= 25);
console.log(firstAdult); // Output: { name: 'Alice', age: 25 }

//todo 14 some(callback) - DOES NOT mutate. Checks if at least one element matches the condition.
const hasTeen = users.some(user => user.age < 20);
console.log(hasTeen); // Output: false

//todo 15 every(callback) - DOES NOT mutate. Checks if all elements match the condition.
const allAdults = users.every(user => user.age >= 18);
console.log(allAdults); // Output: true

// Note: prefer non-mutating methods (map/filter/reduce) for functional-style, predictable code.
