//! 1
let num = 26;
if (num % 10 === 0) {
    console.log("good");
} else {
    console.log("bad");
}

//! 2
let name = prompt("Enter your name:");
let age = prompt("Enter your age:");
let msg = `${name} is ${age} years old.`;
// let msg = name + " is " + age + " years old.";
alert(msg);

//! 3
let quarter = 3;
switch (quarter) {
    case 1:
        console.log("Quarter 1 months: January, February, March");
        break;
    case 2:
        console.log("Quarter 2 months: April, May, June");
        break;
    case 3:
        console.log("Quarter 3 months: July, August, September");
        break;
    case 4:
        console.log("Quarter 4 months: October, November, December");
        break;
    default:
        console.log("Invalid month number. Please enter a number between 1 and 4.");
}

//! 4
str = "Akhtar raza";
if((str[0]=== 'a' || str[0] === 'A') && (str.length > 5)){
    console.log("It is a golden string");
} else {
    console.log("It is not a golden string");
}

//! 5
let num1 = 10.5;
let num2 = 200;
let num3 = 300.5;
if (num1 > num2 && num1 > num3) {
    console.log(`The largest number is: ${num1}`);
} else if (num2 > num1 && num2 > num3) {
    console.log(`The largest number is: ${num2}`);
} else if (num3 > num1 && num3 > num2) {
    console.log(`The largest number is: ${num3}`);
} else {
    console.log("Invalid input");
}

//! OR

let a = 5;
let b = 18;
let c = 13;

if(a > b) {
    if(a > c) {
        console.log(a, "is the largest");
    } else {
        console.log(c, "is the largest");
    }
} else {
    if(b > c) {
        console.log(b, "is the largest");
    } else {
        console.log(c, "is the largest");
    }
}

//! 6

let num4 = 32;
let num5 = 47852;
if (num4 % 10 === num5 % 10) {
    console.log("Both numbers end with 2");
} else {
    console.log("Both numbers do not end with 2");
}