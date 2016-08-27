/**
 * 002_moving_zeros_to_the_end.js
 * https://www.codewars.com/kata/moving-zeros-to-the-end/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.
 *
 * moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]
 */

// Solutions.
var moveZeros = function (arr) {
  function isZero(v) {
    return v === 0;
  }

  return arr.filter(function (v) {
    return !isZero(v);
  }).concat(arr.filter(function (v) {
    return isZero(v);
  }));
};


// Tests.
JSON.stringify(moveZeros([1, 2, 0, 1, 0, 1, 0, 3, 0, 1])) === JSON.stringify([1, 2, 1, 1, 3, 1, 0, 0, 0, 0]); // true.
