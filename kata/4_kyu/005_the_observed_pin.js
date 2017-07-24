/**
 * 005_the_observed_pin.js
 * https://www.codewars.com/kata/the-observed-pin/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * Alright, detective, one of our colleagues successfully observed our target person, Robby the robber. We followed him to a secret warehouse, where we assume to find all the stolen stuff. The door to this warehouse is secured by an electronic combination lock. Unfortunately our spy isn't sure about the PIN he saw, when Robby entered it.
 *
 * The keypad has the following layout:
 *
 * ┌───┬───┬───┐
 * │ 1 │ 2 │ 3 │
 * ├───┼───┼───┤
 * │ 4 │ 5 │ 6 │
 * ├───┼───┼───┤
 * │ 7 │ 8 │ 9 │
 * └───┼───┼───┘
 *     │ 0 │
 *     └───┘
 * He noted the PIN 1357, but he also said, it is possible that each of the digits he saw could actually be another adjacent digit (horizontally or vertically, but not diagonally). E.g. instead of the 1 it could also be the 2 or 4. And instead of the 5 it could also be the 2, 4, 6 or 8.
 *
 * He also mentioned, he knows this kind of locks. You can enter an unlimited amount of wrong PINs, they never finally lock the system or sound the alarm. That's why we can try out all possible (*) variations.
 *
 * * possible in sense of: the observed PIN itself and all variations considering the adjacent digits
 *
 * Can you help us to find all those variations? It would be nice to have a function, that returns an array of all variations for an observed PIN with a length of 1 to 8 digits. We could name the function getPINs (get_pins in python). But please note that all PINs, the observed one and also the results, must be strings, because of potentially leading '0's. We already prepared some test cases for you.
 *
 * Detective, we count on you!
 */

// Solutions.
function getPINs(observed) {
  var pins = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], [null, "0", null]];

  function inRange(x, y, maxX, maxY) {
    return x >= 0 && y >= 0 && x <= maxX && y <= maxY;
  }

  function getPossibleDigits(digit) {
    for (var y = 0; y < pins.length; y++) {
      var x = pins[y].indexOf(digit);
      if (x >= 0) {
        return [[x, y], [x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]].filter(function (p) {
          return inRange(p[0], p[1], pins[y].length - 1, pins.length - 1);
        }).map(function (v) {
          if (v[0] < 0 || v[1] < 0) {
            return null;
          }

          return pins[v[1]][v[0]];
        }).filter(function (v) {
          return v != null;
        });
      }
    }

    return [];
  }

  return Array.prototype.map.call(observed, getPossibleDigits).reduce(function (previous, current) {
    if (previous == null) return current;
    var merge = [];
    previous.forEach(function (p) {
      current.forEach(function (c) {
        merge.push(p + c);
      });
    });
    return merge;
  }, null);
}

// Tests.
var expectations = {
  "8": ["5", "7", "8", "9", "0"],
  "11": ["11", "22", "44", "12", "21", "14", "41", "24", "42"],
  "369": ["339", "366", "399", "658", "636", "258", "268", "669", "668", "266", "369", "398", "256", "296", "259", "368", "638", "396", "238", "356", "659", "639", "666", "359", "336", "299", "338", "696", "269", "358", "656", "698", "699", "298", "236", "239"]
};
for (var pin in expectations) {
  console.log(getPINs(pin).sort().join() === expectations[pin].sort().join()); // true.
}
