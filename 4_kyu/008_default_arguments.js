/**
 * 008_default_arguments.js
 * https://www.codewars.com/kata/default-arguments/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * Write a function defaultArguments. It takes a function as an argument, along with an object containing default values for that function's arguments, and returns another function which defaults to the right values.
 *
 * You cannot assume that the function's arguments have any particular names.
 *
 * You should be able to call defaultArguments repeatedly to change the defaults.
 *
 * function add(a,b) { return a+b;};
 *
 * var add_ = defaultArguments(add,{b:9});
 * add_(10); // returns 19
 * add_(10,7); // returns 17
 * add_(); // returns NaN
 *
 * add_ = defaultArguments(add_,{b:3, a:2});
 * add_(10); // returns 13 now
 * add_(); // returns 5
 *
 * add_ = defaultArguments(add_,{c:3}); // doesn't do anything, since c isn't an argument
 * add_(10); // returns NaN
 * add_(10,10); // returns 20
 * HINT: This problem requires using Fuction.prototype.toString() in order to extract a function's argument list
 */

// Solutions.
function defaultArguments(func, params) {
  var regexp = /function[^\(]+\(([^\)]*)\)/gi;
  var paramNames = func.paramNames;
  if (!paramNames) {
    var funcStr = Function.prototype.toString.call(func).replace(/\/\/.*[\n\r]/gi, "").replace(/\/\*.*\*\//gi, "");
    var matches = regexp.exec(funcStr);
    if (matches && matches[1].length != 0) {
      paramNames = matches[1].split(",").map(function (v) {
        return v.trim();
      });
    } else paramNames = [];
  }
  var newF = function () {
    var args = Array.prototype.splice.call(arguments, 0);
    try {
      var newArgs = paramNames.map(function (paramName, i) {
        if (args.length > i) return args[i];
        return params[paramName];
      });
      return func.apply(func, newArgs);
    } catch (e) {
      return NaN;
    }
  };
  newF.paramNames = paramNames;
  return newF;
}


// Tests.
function add(a, b) {
  return a + b;
}
var add_ = defaultArguments(add, {b: 9});
Test.assertEquals(add_(10), 19);
Test.assertEquals(add_(10, 5), 15);
var add_ = defaultArguments(add_, {b: 3});
Test.assertEquals(add_(10), 13);