
//* 1) Factory Function - A functions that creates or return objects. They are useful for creating multiple instances of similar objects without using classes.

function personMaker(name, age){
    return {
        name: name,
        age: age,
        talk() {
            console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        },
    };
}

let p1 = personMaker("Alice", 30); // copy
console.log(p1);
let p2 = personMaker("Bob", 25); // copy
console.log(p2);

//todo Disadvantages of Factory Functions
console.log(p1.talk === p2.talk); //? false - Each object has its own copy of the talk method, which can lead to higher memory usage if many objects are created.


//* 2) New Operator and Constructor

//? A constructor function(does not returns any thing) is a special type of function that is used to create and initialize objects. By convention, constructor function names start with an uppercase letter to distinguish them from regular functions.

//? The new operator lets developers create instance of a user-defined object type or of one of the built-in object types that has a constructor function.
//? When a function is invoked with the new operator, the following things happen:
//? 1. A new empty or blank {} object is created.
//? 2. The function's this keyword is set to the new object.
//? 3. The new object is linked to the function's prototype.
//? 4. The function body executes, modifying the new object. ? 5. If the function doesn't return an object, the new
//object is returned.

