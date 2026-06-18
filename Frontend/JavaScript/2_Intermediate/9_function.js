//! ============================================================================
//! JAVASCRIPT HOISTING + VAR, LET, CONST + TEMPORAL DEAD ZONE (TDZ)
//! ============================================================================

/*
===============================================================================
WHAT IS HOISTING?
===============================================================================

Hoisting is JavaScript's behavior of moving declarations to the top of their
scope before code execution.

JavaScript executes code in 2 phases:

1. Memory Creation Phase (Creation Phase)
2. Code Execution Phase

During the Memory Creation Phase:
- Variables and functions are stored in memory.
- Function declarations get their complete function definition.
- var gets initialized with undefined.
- let and const are hoisted but remain uninitialized (TDZ).

During the Code Execution Phase:
- Values are assigned.
- Statements execute line by line.
*/


//! ============================================================================
//! PART 1 : VAR
//! ============================================================================

/*
Before Execution (Memory Creation Phase)

var a;

a = undefined;


After Execution Starts

console.log(a); // undefined

a = 10;
*/

console.log(a); // undefined

var a = 10;

console.log(a); // 10


/*
VAR CHARACTERISTICS

✔ Hoisted
✔ Initialized with undefined during hoisting
✔ Can be redeclared
✔ Can be reassigned
✔ Function Scoped
✖ No Temporal Dead Zone
*/


//! ============================================================================
//! PART 2 : LET
//! ============================================================================

/*
Before Execution (Memory Creation Phase)

let b;

Memory allocated
BUT NOT initialized

b remains inside TDZ


Execution Phase

b = 20;
*/


// console.log(b); // ❌ ReferenceError

let b = 20;

console.log(b); // 20


/*
LET CHARACTERISTICS

✔ Hoisted
✔ Block Scoped
✔ Can be reassigned
✖ Cannot be redeclared
✖ Not initialized during hoisting
✔ Has Temporal Dead Zone (TDZ)
*/


//! ============================================================================
//! PART 3 : CONST
//! ============================================================================

/*
Before Execution (Memory Creation Phase)

const c;

Memory allocated
BUT NOT initialized

c remains inside TDZ


Execution Phase

c = 30;   // Must assign immediately
*/


// console.log(c); // ❌ ReferenceError

const c = 30;

console.log(c); // 30


/*
CONST CHARACTERISTICS

✔ Hoisted
✔ Block Scoped
✖ Cannot be redeclared
✖ Cannot be reassigned
✔ not initialized during hoisting
✔ Has Temporal Dead Zone (TDZ)
*/


//! ============================================================================
//! WHAT IS TEMPORAL DEAD ZONE (TDZ)?
//! ============================================================================

/*
TDZ = Time between hoisting and initialization.

The variable exists in memory,
but JavaScript does not allow access to it.

TDZ starts:
    From beginning of scope

TDZ ends:
    When variable gets initialized
*/


// console.log(score); // ❌ TDZ

let score = 100;

console.log(score); // 100


/*
Timeline

Scope Starts
     |
     |
     |---- TDZ ----|
     |
let score = 100;
     |
     |
Accessible
*/




//! ============================================================================
//! INTERVIEW DIFFERENCE TABLE
//! ============================================================================

/*

┌─────────┬──────────┬───────────┬────────────┬────────────┬───────┐
│ Feature │   var    │    let    │   const    │ TDZ        │ Scope │
├─────────┼──────────┼───────────┼────────────┼────────────┼───────┤
│ Hoisted │   Yes    │   Yes     │   Yes      │ let,const  │       │
│ Initial │ undefined│ Uninit.   │ Uninit.    │            │       │
│ TDZ     │   No     │   Yes     │   Yes      │            │       │
│ Redeclare│ Yes     │   No      │   No       │            │       │
│ Reassign│  Yes     │   Yes     │   No       │            │       │
│ Scope   │ Function │  Block    │  Block     │            │       │
└─────────┴──────────┴───────────┴────────────┴────────────┴───────┘

*/


//! ============================================================================
//! ONE-LINE INTERVIEW ANSWERS
//! ============================================================================

/*
Q. What is Hoisting?
Ans:
Hoisting is JavaScript's behavior of moving declarations to the top of
their scope during the memory creation phase.

Q. Why does var print undefined?
Ans:
Because var is hoisted and initialized with undefined.

Q. Why do let and const give ReferenceError?
Ans:
Because they are in the Temporal Dead Zone (TDZ) until initialized.

Q. What is TDZ?
Ans:
The time between variable hoisting and initialization where the variable
cannot be accessed.

Q. Which is fully hoisted?
Ans:
Function Declarations.

Q. Are Function Expressions and Arrow Functions hoisted?
Ans:
Yes, their variables are hoisted, but the function value is assigned later,
so they cannot be called before initialization.
*/


//! ========================= HOISTING IN JAVASCRIPT =========================

//? 1. FUNCTION DECLARATION
// Function declarations are fully hoisted.
// We can call them before they are defined.

greet(); // ✅ Works

function greet() {
    console.log("Hello");
}



//? 2. FUNCTION EXPRESSION WITH VAR
// Only the variable is hoisted and initialized with undefined.
// The function value is assigned later.

console.log(add); // undefined

// add(); // ❌ TypeError: add is not a function

var add = function () {
    console.log("Addition Function");
};

add(); // ✅ Works after assignment



//? 3. ARROW FUNCTION WITH LET AND CONST
// The variable is hoisted but remains in the Temporal Dead Zone (TDZ)
// until it is initialized.
// Accessing it before initialization results in a ReferenceError.

// console.log(multiply); // ❌ ReferenceError
// multiply(); // ❌ ReferenceError

let multiply = () => {
    console.log("Multiplication Function");
};

multiply(); // ✅ Works after initialization



//? INTERVIEW SUMMARY
/*
Function Declaration:
✔ Fully hoisted
✔ Can be called before definition

Function Expression (var):
✔ Variable is hoisted (initialized with undefined)
❌ Cannot be called before assignment

Arrow Function (let/const):
✔ Variable is hoisted
✔ Exists in Temporal Dead Zone (TDZ) until initialization
❌ Cannot be accessed or called before initialization

Important:
Function Expressions and Arrow Functions ARE hoisted,
but only their variables are hoisted, not the actual function value.
*/
