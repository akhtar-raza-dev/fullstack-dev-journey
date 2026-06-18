/* Primitives: string, number, boolean, null, undefined, symbol, bigint
   Reference types: object, array, function
 */

let rollNo = [101, 102, 103, 104, 105];
let students = ["John", "Jane", "Jim", "Jill", "Jack"];
let data = [101, "John", 102, "Jane", 103, "Jim", 104, "Jill", 105, "Jack"]; //? in JavaScript, arrays can hold mixed data types not like in java. arrays are reference types, and in JavaScript they are a special kind of object.
let marks = []; // Empty array to store marks
console.log(rollNo.length);
console.log(students[0]); // Access the first element
console.log(typeof students); // output: "object" (arrays are a special type of object in JavaScript)
console.log(Array.isArray(students)); // true if `students` is an array
console.log(students[students.length - 1]); // Access the last element


console.log(data[1][0]); // output "j"

let nestedArray = [[["a", "b"], ["c", "d"]], [["e", "f"], ["g", "h"]]];
console.log(nestedArray[0][0][1]);  // output "b"

//!   Arrays are mutable, meaning you can change their elements

students[0] = "Alice"; // Change the first element
console.log(students); // Output: ["Alice", "Jane", "Jim", "Jill", "Jack"]

//* Interesting fact: In JavaScript, arrays we if add elements to undefined indices,it will not throw an error
//* but will create a sparse array.sparse array is nothing but an array with empty slots with undefined values in between with the last index defined by us.

students[10] = "Bob"; // Adding an element at index 10
console.log(students); // Output: ["Alice", "Jane", "Jim", "Jill", "Jack", <5 empty items>, "Bob"]
console.log(students.length); // Output: 11, length includes empty slots
console.log(students[8]); // Output: undefined