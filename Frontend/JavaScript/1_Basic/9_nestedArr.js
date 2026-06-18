//! Nested Arrays or Multidimensional Arrays - Arrays within Arrays

//* Simple array example
let arr = [1, 2, 3, 4, 5];
console.log(arr[0]); // 1 - Access first element

//* Nested array example - array containing another array
let nestedArr = [1, 2, [3, 4, 5], 6, 7];
console.log(nestedArr[2]); // [3, 4, 5] - Access nested array at index 2
console.log(nestedArr[2][0]); // 3 - Access first element of nested array using [index][index] notation
console.log(nestedArr[2][1]); // 4 - Access second element of nested array
console.log(nestedArr[2][5]); // undefined - Index out of bounds for nested array

//* Practice Question - to show a Tic Tac Toe game state (2D array with [row][column] notation)

let game = [['X', null, 'O'], [null, 'X', null], ['O', null, 'X']];
game[0][1] = 'O'; // Update position at row 0, column 1
console.log(game);
