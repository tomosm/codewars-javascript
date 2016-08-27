/**
 * 003_simple_digit_code_breaker.js
 * https://www.codewars.com/kata/simple-digit-code-breaker/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * In this kata, you have to break a code of 3 digits. The tryCode() function is called in loop with a max of 10 attempts. It have to return an array of 3 digits.
 *
 * During the first call, the "indications" parameter is null, then it is the result array of the confrontation between last proposition and solution. You may have 3 different values:
 *
 * 0 means the proposed digit is correct
 * 1 means the proposed digit is lower than the correct one
 * -1 means the proposed digit is higher than the correct one
 * Pseudo-algorithm example :
 *
 * solution is randomly created, in this example this [1,2,3]
 * tryCode(null) => [0, 2, 4] // for the first call, indications is null, we assume that it returns [0,2,4]
 * tryCode([1, 0, -1]) // [0, 2, 4] isn't the solution, so tryCode() is called again, with the indications [1, 0, -1] as explained above : 0 below 1 => 1 ; 2 == 2 => 0 ; 4 above 3 => -1
 * ...so on, until tryCode() returns the solution or it is called up to 10 times (to avoid a brute force)
 */

// Solutions.
function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function tryCode(indications) {
  if (indications === null) {
    guess = [randomDigit(), randomDigit(), randomDigit()];
  } else {
    indications.forEach(function (v, i) {
      guess[i] += v;
    });
  }
  return guess;
}


// Tests.
tryCode(null);
tryCode([1, 0, -1]);
