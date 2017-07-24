/**
 * 001_vector_class.js
 * https://www.codewars.com/kata/vector-class/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * Create a Vector object that supports addition, subtraction, dot products, and norms. So, for example:
 *
 * var a = new Vector([1,2,3]);
 * var b = new Vector([3,4,5]);
 * var c = new Vector([5,6,7,8]);
 * a.add(b); // should return Vector([4,6,8])
 * a.subtract(b); // should return Vector([-2,-2,-2])
 * a.dot(b); // should return 1*3+2*4+3*5 = 26
 * a.norm(); // should return sqrt(1^2+2^2+3^2)=sqrt(14)
 * a.add(c); // throws an error
 * If you try to add, subtract, or dot two vectors with different lengths, you must throw an error!
 *
 * Also provide:
 *
 * a toString function, so that using the vectors from above, a.toString() === '(1,2,3)' (in Python, this is a __str__ method, so that str(a) == '(1,2,3)')
 * an equals function, so that two vectors who have the same components are equal
 * The test cases will utilize the user-provided equals method.
 */

// Solutions.
var Vector = function (components) {
  var self = this;

  function sum(ary) {
    var sum = 0;
    ary.forEach(function (v) {
      sum += v;
    });
    return sum;
  }

  this.components = components;
  this.add = function (vector) {
    if (self.components.length !== vector.components.length) throw Error();
    return new Vector(Array.prototype.map.call(vector.components, function (component, i) {
      return self.components[i] + component;
    }));
  };
  this.subtract = function (vector) {
    if (self.components.length !== vector.components.length) throw Error();
    return new Vector(Array.prototype.map.call(vector.components, function (component, i) {
      return self.components[i] - component;
    }));
  };
  this.dot = function (vector) {
    if (self.components.length !== vector.components.length) throw Error();
    return sum(Array.prototype.map.call(vector.components, function (component, i) {
      return self.components[i] * component;
    }));
  };
  this.norm = function () {
    return Math.sqrt(sum(Array.prototype.map.call(self.components, function (component, i) {
      return Math.pow(self.components[i], 2);
    })));
  };
  this.toString = function () {
    return "(" + self.components.join(",") + ")";
  };
  this.equals = function (vector) {
    return self.components.join(" ") === vector.components.join(" ");
  }
};


// Tests.
var a = new Vector([1, 2]);
var b = new Vector([3, 4]);

a.add(b).equals(new Vector([4, 6])); // true.
