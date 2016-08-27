/**
 * 002_base64_encoding.js
 * https://www.codewars.com/kata/base64-encoding/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * Extend the String object (JS) or create a function (Python) that converts the value of the String to and from Base64 using the ASCII character set.
 *
 * Usage:
 *
 * // should return 'dGhpcyBpcyBhIHN0cmluZyEh'
 * 'this is a string!!'.toBase64();
 *
 * // should return 'this is a string!!'
 * 'dGhpcyBpcyBhIHN0cmluZyEh'.fromBase64();
 */

// Solutions.
(function () {
  var lpad = function (str, length, char) {
    return (new Array(length + 1).join(char) + str).slice(-1 * length);
  };

  var rpad = function (str, length, char) {
    return (str + (new Array(length + 1)).join(char)).slice(0, length);
  };

  var binaryToDecimal = function (binary) {
    return parseInt(binary, 2);
  };

  var toBinary = function (char) {
    return lpad(parseInt(char.charCodeAt(0)).toString(2), 8, '0');
  };

  const CODES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var toCode = function (index) {
    return CODES[index];
  };

  const CUT_POINT_INDEX = 6;
  var encodeBase64 = function (str) {
    var str = this;
    if (str === undefined || str === null || str === '') return '';

    var binaries = '';
    for (var i = 0, l = str.length; i < l; i++) {
      binaries += toBinary(str[i]);
    }

    var base64str = '';
    while (binaries.length >= CUT_POINT_INDEX) {
      base64str += (toCode(binaryToDecimal(binaries.substr(0, CUT_POINT_INDEX))));
      binaries = binaries.substr(CUT_POINT_INDEX);
    }
    if (binaries.length > 0) {
      base64str += (toCode(binaryToDecimal(rpad(binaries, CUT_POINT_INDEX, '0'))));
    }

    var gapLength = base64str.length % 4;
    return (gapLength === 0) ? base64str : rpad(base64str, base64str.length + gapLength, '=');
  };


  var decodeBase64 = function () {
    var encodedStr = this;
    encodedStr = encodedStr.replace(/=/g, "");
    var binary = "";
    for (var i = 0, l = encodedStr.length; i < l; i++) {
      binary += lpad(parseInt(CODES.indexOf(encodedStr.charAt(i))).toString(2), CUT_POINT_INDEX, '0');
    }
    var decodeStr = "";
    for (var i = 0, l = Math.floor(binary.length / 8); i < l; i++) {
      decodeStr += String.fromCharCode(parseInt(binary.substr(i * 8, 8), 2));
    }
    return decodeStr;
  };

  String.prototype.toBase64 = encodeBase64;
  String.prototype.fromBase64 = decodeBase64;
}());


// Tests.
'this is a string!!'.toBase64() === 'dGhpcyBpcyBhIHN0cmluZyEh'; // true.
'dGhpcyBpcyBhIHN0cmluZyEh'.fromBase64() === 'this is a string!!'; // true.
