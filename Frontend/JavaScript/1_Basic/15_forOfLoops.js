//todo do while loop is also supported in js
//! for...of loops — iterate over iterable values (arrays, strings, Map, Set, etc.)

let heros = ["Iron Man", "Spider-Man", "Thor", "Hulk", "Captain America"];

// for...of gives each value directly
for (let hero of heros) {
    console.log(hero);
}

// Works with strings too (iterates characters)
let str = "ApnaCollege";
for (let char of str) {
    console.log(char);
}

// Important note about loop variable declaration:
// - Always declare the loop variable (let/const/var). Omitting the declaration
//   (e.g. `for (hero of heros)`) can create a global variable in non-strict mode
//   or throw a ReferenceError in strict mode. Don't rely on that behavior.
// Example (bad practice, shown commented):
// for (hero of heros) { console.log(hero); } // if 'hero' is not declared, this is unsafe
// console.log(hero); // may print last value in non-strict mode — avoid this

// for...of with nested arrays (iterate each sub-array, then its elements)
let heros2 = [
    ["Iron Man", "Spider-Man", "Thor", "Hulk", "Captain America"],
    ["Batman", "Superman", "Flash", "Green Lantern"]
];

for (let list of heros2) {
    for (let hero of list) {
        console.log(hero);
    }
}

// for...in is different: it iterates enumerable property keys (object keys or array indexes).
// It's NOT a direct replacement for arrays because it iterates keys (strings) and
// can include inherited enumerable properties. Prefer for...of, classic for, or
// Array.prototype.forEach for arrays.

// Compatibility note: older Internet Explorer versions do not support for...of.
// If you must support those browsers, use a classic for loop or Array.prototype.forEach.

// Classic indexed loop (always supported)
for (let i = 0; i < heros.length; i++) {
    console.log(heros[i]);
}