/**
 * 004_base_conversion.js
 * https://www.codewars.com/kata/base-conversion/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * In this kata you have to implement a base converter, which converts between arbitrary bases / alphabets. Here are some pre-defined alphabets:
 *
 * var Alphabet = {
 *  BINARY:        '01',
 *  OCTAL:         '01234567',
 *  DECIMAL:       '0123456789',
 *  HEXA_DECIMAL:  '0123456789abcdef',
 *  ALPHA_LOWER:   'abcdefghijklmnopqrstuvwxyz',
 *  ALPHA_UPPER:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
 *  ALPHA:         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
 *  ALPHA_NUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
 * };
 * The function convert() should take an input (string), the source alphabet (string) and the target alphabet (string). You can assume that the input value always consists of characters from the source alphabet. You don't need to validate it.
 *
 * Examples:
 *
 * // convert between numeral systems
 * convert("15", Alphabet.DECIMAL, Alphabet.BINARY); // should return "1111"
 * convert("15", Alphabet.DECIMAL, Alphabet.OCTAL); // should return "17"
 * convert("1010", Alphabet.BINARY, Alphabet.DECIMAL); // should return "10"
 * convert("1010", Alphabet.BINARY, Alphabet.HEXA_DECIMAL); // should return "a"
 *
 * // other bases
 * convert("0", Alphabet.DECIMAL, Alphabet.ALPHA); // should return "a"
 * convert("27", Alphabet.DECIMAL, Alphabet.ALPHA_LOWER); // should return "bb"
 * convert("hello", Alphabet.ALPHA_LOWER, Alphabet.HEXA_DECIMAL); // should return "320048"
 * convert("SAME", Alphabet.ALPHA_UPPER, Alphabet.ALPHA_UPPER); // should return "SAME"
 * Additional Notes:
 *
 * The maximum input value can always be encoded in a number without loss of precision in JavaScript. In Haskell, intermediate results will probably be to large for Int.
 * The function must work for any arbitrary alphabets, not only the pre-defined ones
 * You don't have to consider negative numbers
 */

// Solutions.
function convert(input, source, target) {
  function toDecimal() {
    return Array.prototype.reduceRight.call(input, function (previous, current, i, str) {
      return source.indexOf(current) * Math.pow(source.length, (str.length - 1 - i)) + previous;
    }, 0);
  }

  function transform(decimal) {
    var val = "";
    var count = 0;
    while (true) {
      var remainder = decimal % target.length;
      val = target[remainder] + val;
      decimal = Math.floor(decimal / target.length);
      count++;
      if (decimal === 0) {
        break;
      }
    }
    return val;
  }

  return transform(toDecimal());
}


// Tests.
var Alphabet = {
  BINARY: '01',
  OCTAL: '01234567',
  DECIMAL: '0123456789',
  HEXA_DECIMAL: '0123456789abcdef',
  ALPHA_LOWER: 'abcdefghijklmnopqrstuvwxyz',
  ALPHA_UPPER: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ALPHA: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ALPHA_NUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
};

var bin = Alphabet.BINARY, oct = Alphabet.OCTAL, dec = Alphabet.DECIMAL, hex = Alphabet.HEXA_DECIMAL,
  allow = Alphabet.ALPHA_LOWER, alup = Alphabet.ALPHA_UPPER, alpha = Alphabet.ALPHA, alnum = Alphabet.ALPHA_NUMERIC;

console.log(
  convert("15", dec, bin) === '1111', // true
  convert("15", dec, oct) === '17', // true
  convert("1010", bin, dec) === '10', // true
  convert("1010", bin, hex) === 'a', // true

  convert("0", dec, alpha) === 'a', // true
  convert("27", dec, allow) === 'bb', // true
  convert("hello", allow, hex) === '320048', // true
  convert("SAME", alup, alup) === 'SAME' // true
);