/* Array reference and equality (easy English)
   - Arrays are reference types: variables store a reference (address) to the array object.
   - If two variables point to the same array object, changing via one variable shows up in the other.
   - Two different arrays with the same items are still different objects in memory.
*/

// Example: strings (primitive) compare by value
console.log("a" == "a");   // true (same value)
console.log("a" === "a");  // true (same value and same type)

// Example: arrays (objects) compare by reference
console.log([1] == [1]);   // false  - different array objects, not the same reference
console.log([1] === [1]);  // false  - also different references

// Assigning reference
let num = [1, 2];           // variable 'num' points to the array object
let num2 = num;             // 'num2' now points to the same array object
console.log(num === num2);  // true   - same reference

// Elements are primitives, compare by value
console.log(num[0] === num2[0]); // true  (both are number 1)
console.log(num[1] === num2[0]); // false (2 === 1 is false)

// If you make a copy instead of reference, the arrays are different:
let copy = num.slice();     // shallow copy, new array object with same items
console.log(copy === num);  // false  - different object

/* Quick interview answer: == vs ===
   - ==  : loose equality — JavaScript may convert types before comparing.
   - === : strict equality — no conversion; checks type and value.

"The double equals (==) may perform type coercion before comparison and checking only the values, not the data type,
whereas the triple equals (===) strictly compare both the value and the data type without any type coercion."
*/

console.log(5 == '5');   // true
console.log(5 === '5');  // false

console.log(false == 0);   // true  (0 and false are equal after conversion)
console.log(false === 0);  // false (different types)

console.log(null == undefined);  // true  (special case of loose equality)
console.log(null === undefined); // false (different types)

// Tip: in real code use === (strict) to avoid surprises.
