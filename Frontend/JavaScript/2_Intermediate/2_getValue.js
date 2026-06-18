//* How to access values from an object using keys

const obj = {
    name: 'John',
    age: 30,
    city: 'New York'
}
//? 1) Dot notation - easiest when you know the property name
console.log(obj.name); // John


//? 2) Bracket notation - useful when the key is in a variable
console.log(obj["age"]); // 30
//! console.log(obj[city]); // ReferenceError: city is not defined, so use quotes around the key

//! If the key is stored in a variable, bracket notation works
let updatedAge = "age";
console.log(obj[updatedAge]); // 30
//? Dot notation treats updatedAge as the literal property name, not the variable value
console.log(obj.updatedAge); // undefined

//* JavaScript converts object keys to strings automatically
//* So numbers, booleans, null, and undefined become string keys behind the scenes

const obj2 = {
    1: 'one',
    2: 'two',
    true: 'a',
    null: 'e',
    undefined: 'd',
    "fan": "cool" // written inside quotes too because at the end keys are always strings.
}

//todo This is less common, but useful when keys look like numbers or booleans
console.log(obj2[1]); //! one (1 becomes "1")
console.log(obj2["1"]); // one
console.log(obj2[2]); // two
console.log(obj2["2"]); // two
console.log(obj2[true]); // a
console.log(obj2["true"]); // a
console.log(obj2[null]); // e
console.log(obj2["null"]); // e
console.log(obj2[undefined]); // d
console.log(obj2["undefined"]); // d

//* With dot notation, numeric keys do not work
console.log(obj2.true);
// console.log(obj2.1); // SyntaxError: Unexpected number
console.log(obj2.undefined);
console.log(obj2.null);