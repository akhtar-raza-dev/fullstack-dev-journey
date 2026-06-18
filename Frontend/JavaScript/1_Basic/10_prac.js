//! 1
let arr = [7,9,0,-2];
let n = 3;
let ans = arr.slice(0, n);
console.log(ans); // Output: [7, 9, 0]

//! 2

let ans2 = arr.slice(arr.length - n);
console.log(ans2); // Output: [9, 0, -2] - Last 3 elements of the array

//! 3

let str = prompt("Enter a string:");
if(str.length === 0) {
    console.log("String is empty");
} else {
    console.log("String is not empty");
}

//! 4

let str1 = "apNaCoLlEgE";
let idx = 3;

if(str1[idx] === str1[idx].toLowerCase()) {
    console.log("Character is lowercase");
} else {
    console.log("Character is not lowercase");
}

//! 5
let str2 = prompt("Enter a string:");
console.log(`original string: ${str2}`);
console.log(`string with trimmed spaces (beginning/end only): ${str2.trim()}`);
// Note: trim() removes spaces only from start and end, not from the middle
// To remove ALL spaces use: str2.replace(/\s/g, '')
console.log(`string without all spaces: ${str2.replace(/\s/, '')}`);

//! 6
let arr2 = ["hello", 'a', 23, 64, 99, -6];
let item = 64;

if(arr2.includes(item)) {
    console.log(`Item ${item} is present in the array`);
} else {
    console.log(`Item ${item} is not present in the array`);
}