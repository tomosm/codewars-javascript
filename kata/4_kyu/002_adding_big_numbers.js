/**
 * 002_adding_big_numbers.js
 * https://www.codewars.com/kata/adding-big-numbers/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * We need to sum big numbers and we require your help.
 *
 * Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.
 *
 * Example
 *
 * add("123", "321"); -> "444"
 * add("11", "99"); -> "110"
 * Notes
 *
 * The input numbers are big.
 * The input is a string of only digits
 * The numbers are positives
 */

// Solutions.
function add(a, b) {
  var MAX_LENGTH = String(Number.MAX_SAFE_INTEGER).length;
  if (a.length < MAX_LENGTH && b.length < MAX_LENGTH) {
    return String(Number(a) + Number(b));
  }

  var SPLIT_LENGTH = 3;

  function splitFinityNum(val) {
    var len = val.length;
    var nums = [];
    for (var i = 0; ; i++) {
      var to = len - SPLIT_LENGTH * i;
      var from = to - SPLIT_LENGTH;
      if (from < 0) from = 0;
      nums.push(val.slice(from, to));
      if (from == 0) break;
    }
    return nums;
  }

  function zeroPadding(val) {
    var len = SPLIT_LENGTH;
    return ("0".repeat(len) + val).slice(-1 * len);
  }

  function addNums(biggers, smallers) {
    var num = "";
    var carryOver = false;
    biggers.forEach(function (val, i) {
      var cal = String(Number(val) + (Number(smallers[i]) | 0) + (carryOver ? 1 : 0));
      carryOver = cal.length > SPLIT_LENGTH;
      if (carryOver) cal = cal.slice(-1 * SPLIT_LENGTH);
      num = (val.length == SPLIT_LENGTH ? zeroPadding(cal) : cal) + num;
    });
    if (carryOver) num = "1" + num;
    return num;
  }

  var aNums = splitFinityNum(a);
  var bNums = splitFinityNum(b);
  return aNums.length > bNums.length ? addNums(aNums, bNums) : addNums(bNums, aNums);
}

// Tests.
add("123", "321") === "444"; // true.
add("11", "99") === "110"; // true.
