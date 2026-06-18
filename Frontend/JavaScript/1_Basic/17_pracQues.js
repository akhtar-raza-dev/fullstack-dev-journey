//! 1 - Remove all occurrences of a number from an array
let arr = [1, 2, 3, 4, 5, 6, 2, 3];
let num = 2;

// Iterate backwards to avoid skipping elements when splicing
// (when we remove an element, indices shift, so going forward skips items)
for(let i = arr.length - 1; i >= 0; i--) {
    if(arr[i] === num) {
        arr.splice(i, 1);
    }
}
console.log(arr);

//! 2 - to find a digit count of a number using for loop without converting in string

let count = 0;
let number = 287152;

// Math.floor(i/10) removes the last digit by dividing by 10 and rounding down
// Example: 287 / 10 = 28.7, Math.floor(28.7) = 28
for(let i = number; i > 0; i = Math.floor(i/10)){
    count++;
}
console.log(count);

//? or

let countt = 0;
while (number > 0) {
    countt++;
    // Math.floor(number/10) removes the last digit: 287 / 10 = 28.7 → 28
    number = Math.floor(number/10);
}
console.log(countt);

//! 3

let number2 = 287152;
let sum = 0;

let temp= number2;

while(temp > 0){
   let digit = temp % 10;
   sum += digit;
   // Math.floor(temp/10) removes the last digit after extracting it
   // Example: 287 / 10 = 28.7 → 28
   temp = Math.floor(temp/10);
}
console.log(sum);

//? OR

let summ = 0;
// Math.floor(temp/10) removes the last digit from the number each iteration
// 287 → 28 → 2 → 0 (loop ends)
for (let temp = number2; temp > 0; temp = Math.floor(temp/10)) {
    let digit = temp % 10;
    summ += digit;
}
console.log(summ);

//! 4

let n = 5;
let factorial = 1;

for(let i = 1; i <= n; i++){
    factorial *= i;
}
console.log(factorial);

//! 5
let arr1 = [2, 5, 10, 4, 2, 7, 1, 9];
let largest = 0;

// Use i < arr1.length, not i <= arr1.length (avoid accessing undefined element)
for(let i = 0; i < arr1.length; i++){
    if(largest < arr1[i]){
        largest = arr1[i];
    }
}
console.log(largest);