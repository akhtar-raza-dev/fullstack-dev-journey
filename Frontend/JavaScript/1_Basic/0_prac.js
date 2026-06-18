let size = "M";
if (size === "XL") {
    console.log("Price of a pop corn for XL is Rs.250");
} else if (size === "L") {
    console.log("Price of a pop corn for L is Rs.200");
} else if (size === "M") {
    console.log("Price of a pop corn for M is Rs.100");
} else if (size === "S") {
    console.log("Price of a pop corn for S is Rs.50");
} else {
    console.log("Invalid Size");
}

let str = "Akhr";
if ((str[0] === "a" || str[0] === "A") && (str.length > 3)) {
    console.log("it is good string");
}
else {
    console.log("it is not good string");
}

alert("Hello");
console.log("this is a simple msg");
console.error("this is an error msg");
console.warn("this is a warning msg");

// for input
let firstName = prompt("Enter your first name");
let lastName = prompt("Enter your last name");
let str1 = "Welcome " + firstName + " " + lastName + " to our website";
alert(str1);

