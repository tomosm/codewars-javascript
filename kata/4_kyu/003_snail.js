/**
 * 003_snail.js
 * https://www.codewars.com/kata/snail/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * Snail Sort
 *
 * Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.
 *
 * array = [[1,2,3],
 * [4,5,6],
 * [7,8,9]]
 * snail(array) #=> [1,2,3,6,9,8,7,4,5]
 * For better understanding, please follow the numbers of the next array consecutively:
 *
 * array = [[1,2,3],
 * [8,9,4],
 * [7,6,5]]
 * snail(array) #=> [1,2,3,4,5,6,7,8,9]
 * This image will illustrate things more clearly:
 *
 * NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.
 *
 * NOTE 2: The 0x0 (empty matrix) is represented as [[]]
 */

// Solutions.
snail = function (array) {
  var d1 = [];
  for (var x = 0, y = array[0].length - 1; x <= y; x++, y--) {
    for (var i = x, j = x; j <= y; j++) {
      d1.push(array[i][j]);
    }
    for (var i = x + 1, j = y; i <= y; i++) {
      d1.push(array[i][j]);
    }
    for (var i = y, j = y - 1; j >= x; j--) {
      d1.push(array[i][j]);
    }
    for (var i = y - 1, j = x; i > x; i--) {
      d1.push(array[i][j]);
    }
  }
  return d1;
};


// Tests.
