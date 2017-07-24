/**
 * 001_point_in_polygon.js
 * https://www.codewars.com/kata/point-in-polygon/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * The problem
 *
 * In this kata, you're going write a function called pointInPoly to test if a point is inside a polygon.
 *
 * Points will be represented as [x,y] arrays.
 *
 * The polygon will be an array of points which are the polygon's vertices. The last point in the array connects back to the first point.
 *
 * You can assume:
 *
 * The polygon will be a valid simple polygon. That is, it will have at least three points, none of its edges will cross each other, and exactly two edges will meet at each vertex.
 * In the tests, the point will never fall exactly on an edge of the polygon.
 * Testing
 *
 * To help you visualize your test cases, the showAndTest(poly,point,inside) function is preloaded. It draws the polygon and point and then calls Test.expect automatically.
 *
 * So if you call:
 *
 * showAndTest([[-5, -5], [5, -5], [0, 5]], [0,0], true)
 */

// Solutions.
// Return true if point is inside poly, and false if it is not
function pointInPoly(poly, point) {

  function crossingNumberAlgo() {
    var crossingNumber = 0;
    for (var i = 0, l = poly.length; i < l; i++) {
      var startNode = poly[i % l], nextNode = poly[(i + 1) % l];

      function withInYArea() {
        return (startNode[1] <= point[1] && nextNode[1] > point[1]) // upward
          || (startNode[1] > point[1] && nextNode[1] <= point[1]); // downward
      }

      function withInXArea() {
        return point[0] < (startNode[0] + ((point[1] - startNode[1]) / (nextNode[1] - startNode[1])) * (nextNode[0] - startNode[0]));
      }

      if (withInYArea() && withInXArea()) {
        crossingNumber++;
      }
    }
    return crossingNumber % 2 === 1;
  }

  // performance not good
  function windingNumberAlog() {
    var totalRadian = 0;
    for (var i = 0, l = poly.length; i < l; i++) {
      var startNode = poly[i % l], nextNode = poly[(i + 1) % l];

      function calcRadian() {
        var psVector = [startNode[0] - point[0], startNode[1] - point[1]]
        var pnVector = [nextNode[0] - point[0], nextNode[1] - point[1]]
        // rad = acos(cos) => cos = vetor of start/next node from point (A ･ B / |A| * |B|)
        return Math.acos((psVector[0] * pnVector[0] + psVector[1] * pnVector[1]) / (Math.sqrt(Math.pow(psVector[0], 2) + Math.pow(psVector[1], 2)) * Math.sqrt(Math.pow(pnVector[0], 2) + Math.pow(pnVector[1], 2)))) / (Math.PI / 180);
      }

      totalRadian += calcRadian();
    }
    return totalRadian >= 360; // 180 * (poly.length - 3)
  }

  return crossingNumberAlgo();
}


// Tests.
var poly = [
  [-5, -5], [5, -5],
  [5, 5], [-5, 5]
];
pointInPoly(poly, [-6, 0]) === false;
pointInPoly(poly, [1, 1]) === true;
