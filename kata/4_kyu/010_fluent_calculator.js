/**
 * 010_fluent_calculator.js
 * https://www.codewars.com/kata/fluent-calculator/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * Kata based on Fluent Calculator (ruby)
 *
 * Created into a new kata because of a certain limitation the Ruby kata posseses that this kata should also have if translated, which is what lead me to create a new one.
 *
 * Fluent Calculator
 *
 * Your task is to implement a simple calculator with fluent syntax
 *
 * var FluentCalculator = / Magic /;
 * FluentCalculator should be separated in two, the Values and the Operations, one can call the other, but cannot call one of his own.
 *
 * A Value can call an Operation, but cannot call a value
 *
 * FluentCalculator.one.plus
 * FluentCalculator.one.one // undefined, if you may.
 * An Operation can call a Value, but cannont call a operation
 *
 * FluentCalculator.one.plus.two // this should have a value of 3
 * FluentCalculator.one.plus.plus // If you replace 'one' with 'c', I could allow it. (undefined as well)
 * Pairs of Value and Operation should be stackable to infinity
 *
 * FluentCalculator.one.plus.two.plus.three.minus.one.minus.two.minus.four // Should be -1
 * A Value should resolve to a primitive integer
 *
 * FluentCalculator.one.plus.ten - 10 // Should be 1
 * Now, the fun part... Rules
 *
 * eval is disabled
 * Values in FluentCalculator should go from zero to ten.
 *   Supported Operations are plus, minus, times, dividedBy
 * Rules mentioned above
 * FluentCalculator should be stackable to infinity
 * A Value can only call an Operation
 * An Operation can only call a Value
 * A Value should be resolvable to a primitive integer, if needed as such
 */

// Solutions.
var calc = {
  _stack: [],
  formatNumber: function (val) {
    if (val === undefined || val === null || isNaN(Number(val))) {
      return 0;
    }
    return Number(val);
  },
  valueOf: function () {
    var operation = null;
    while (operation !== undefined) {
      var val1 = calc.formatNumber(calc._stack.shift());
      operation = calc._stack.shift();
      var val2 = calc.formatNumber(calc._stack.shift());
      switch (operation) {
      case '+':
        calc._stack.unshift(val1 + val2);
        break;
      case '-':
        calc._stack.unshift(val1 - val2);
        break;
      case '*':
        calc._stack.unshift(val1 * val2);
        break;
      case '/':
        calc._stack.unshift(val1 / val2);
        break;
      default:
        calc._stack.unshift(val1);
        break;
        //   throw new Error("Unsupported operation: " + operation);
      }
    }
    return calc._stack.shift();
  },
  push: function (val) {
    calc._stack.push(val);
  }
};

var values = {
  get zero() {
    calc.push(0);
    return opes;
  },
  get one() {
    calc.push(1);
    return opes;
  },
  get two() {
    calc.push(2);
    return opes;
  },
  get three() {
    calc.push(3);
    return opes;
  },
  get four() {
    calc.push(4);
    return opes;
  },
  get five() {
    calc.push(5);
    return opes;
  },
  get six() {
    calc.push(6);
    return opes;
  },
  get seven() {
    calc.push(7);
    return opes;
  },
  get eight() {
    calc.push(8);
    return opes;
  },
  get nine() {
    calc.push(9);
    return opes;
  },
  get ten() {
    calc.push(10);
    return opes;
  },
  valueOf: calc.valueOf
};

var opes = {
  get plus() {
    calc.push('+');
    return values;
  },
  get minus() {
    calc.push('-');
    return values;
  },
  get times() {
    calc.push('*');
    return values;
  },
  get dividedBy() {
    calc.push('/');
    return values;
  },
  valueOf: calc.valueOf
};

var FluentCalculator = values;


// Tests.
FluentCalculator.zero == 0; // true.
FluentCalculator.one == 1; // true.
FluentCalculator.two == 2; // true.
FluentCalculator.zero.plus.two == 2; // true.
FluentCalculator.ten.minus.one == 9; // true.
FluentCalculator.five.times.ten == 50; // true.
FluentCalculator.eight.dividedBy.two == 4; // true.
