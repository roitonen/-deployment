/**
 * @fileoverview Unit tests for the AT00CK37-3003 library
 * @description Tests written using Mocha and Chai for the software testing assignment.
 * The .internal directory is excluded from testing as per assignment requirements.
 * @module test
 */

import { expect } from 'chai'

import castArray from '../src/castArray.js'
import clamp from '../src/clamp.js'
import compact from '../src/compact.js'
import defaultTo from '../src/defaultTo.js'
import defaultToAny from '../src/defaultToAny.js'
import drop from '../src/drop.js'
import endsWith from '../src/endsWith.js'
import eq from '../src/eq.js'
import every from '../src/every.js'
import filter from '../src/filter.js'
import isArrayLike from '../src/isArrayLike.js'
import isArrayLikeObject from '../src/isArrayLikeObject.js'
import isBoolean from '../src/isBoolean.js'
import isLength from '../src/isLength.js'
import isObject from '../src/isObject.js'
import isObjectLike from '../src/isObjectLike.js'
import isSymbol from '../src/isSymbol.js'
import map from '../src/map.js'
import memoize from '../src/memoize.js'
import slice from '../src/slice.js'
import toFinite from '../src/toFinite.js'
import toInteger from '../src/toInteger.js'
import toNumber from '../src/toNumber.js'
import toString from '../src/toString.js'
import words from '../src/words.js'
import capitalize from '../src/capitalize.js'

// ─── eq ───────────────────────────────────────────────────────────────────────

/**
 * Tests for the eq function.
 * Performs SameValueZero comparison between two values.
 * @see {@link src/eq.js}
 */
describe('eq', () => {
  /**
   * @test Same object reference should return true
   */
  it('returns true for the same object reference', () => {
    const obj = { a: 1 }
    expect(eq(obj, obj)).to.be.true
  })

  /**
   * @test Different objects with same content should return false
   */
  it('returns false for different objects with same content', () => {
    expect(eq({ a: 1 }, { a: 1 })).to.be.false
  })

  /**
   * @test Equal primitives should return true
   */
  it('returns true for equal primitive values', () => {
    expect(eq(1, 1)).to.be.true
    expect(eq('a', 'a')).to.be.true
  })

  /**
   * @test NaN should equal NaN (SameValueZero)
   */
  it('returns true for NaN compared to NaN', () => {
    expect(eq(NaN, NaN)).to.be.true
  })

  /**
   * @test null == undefined via loose equality
   */
  it('returns true for null vs undefined (loose equality)', () => {
    expect(eq(null, undefined)).to.be.true
  })

  /**
   * @test Different primitives should return false
   */
  it('returns false for different primitives', () => {
    expect(eq(1, 2)).to.be.false
  })
})

// ─── isLength ─────────────────────────────────────────────────────────────────

/**
 * Tests for the isLength function.
 * Checks if a value is a valid array-like length.
 * @see {@link src/isLength.js}
 */
describe('isLength', () => {
  /**
   * @test Valid non-negative integers should return true
   */
  it('returns true for valid non-negative integers', () => {
    expect(isLength(0)).to.be.true
    expect(isLength(3)).to.be.true
    expect(isLength(Number.MAX_SAFE_INTEGER)).to.be.true
  })

  /**
   * @test Negative numbers should return false
   */
  it('returns false for negative numbers', () => {
    expect(isLength(-1)).to.be.false
  })

  /**
   * @test Floats should return false
   */
  it('returns false for floats', () => {
    expect(isLength(1.5)).to.be.false
    expect(isLength(Number.MIN_VALUE)).to.be.false
  })

  /**
   * @test Infinity should return false
   */
  it('returns false for Infinity', () => {
    expect(isLength(Infinity)).to.be.false
  })

  /**
   * @test String numbers should return false
   */
  it('returns false for strings', () => {
    expect(isLength('3')).to.be.false
  })

  /**
   * @test Values above MAX_SAFE_INTEGER should return false
   */
  it('returns false for values above MAX_SAFE_INTEGER', () => {
    expect(isLength(Number.MAX_SAFE_INTEGER + 1)).to.be.false
  })
})

// ─── isObject ─────────────────────────────────────────────────────────────────

/**
 * Tests for the isObject function.
 * Checks if a value is an Object language type.
 * @see {@link src/isObject.js}
 */
describe('isObject', () => {
  /**
   * @test Plain objects should return true
   */
  it('returns true for plain objects', () => {
    expect(isObject({})).to.be.true
  })

  /**
   * @test Arrays should return true
   */
  it('returns true for arrays', () => {
    expect(isObject([1, 2, 3])).to.be.true
  })

  /**
   * @test Functions should return true
   */
  it('returns true for functions', () => {
    expect(isObject(() => {})).to.be.true
  })

  /**
   * @test null should return false
   */
  it('returns false for null', () => {
    expect(isObject(null)).to.be.false
  })

  /**
   * @test Primitives should return false
   */
  it('returns false for primitives', () => {
    expect(isObject(1)).to.be.false
    expect(isObject('string')).to.be.false
    expect(isObject(true)).to.be.false
    expect(isObject(undefined)).to.be.false
  })
})

// ─── isObjectLike ─────────────────────────────────────────────────────────────

/**
 * Tests for the isObjectLike function.
 * Checks if value is object-like (not null and typeof 'object').
 * @see {@link src/isObjectLike.js}
 */
describe('isObjectLike', () => {
  /**
   * @test Objects and arrays should return true
   */
  it('returns true for objects and arrays', () => {
    expect(isObjectLike({})).to.be.true
    expect(isObjectLike([1, 2, 3])).to.be.true
  })

  /**
   * @test Functions should return false
   */
  it('returns false for functions', () => {
    expect(isObjectLike(Function)).to.be.false
  })

  /**
   * @test null should return false
   */
  it('returns false for null', () => {
    expect(isObjectLike(null)).to.be.false
  })

  /**
   * @test Primitives should return false
   */
  it('returns false for primitives', () => {
    expect(isObjectLike(1)).to.be.false
    expect(isObjectLike('abc')).to.be.false
  })
})

// ─── isArrayLike ──────────────────────────────────────────────────────────────

/**
 * Tests for the isArrayLike function.
 * Checks if value is array-like (has valid length, not a function).
 * @see {@link src/isArrayLike.js}
 */
describe('isArrayLike', () => {
  /**
   * @test Arrays should return true
   */
  it('returns true for arrays', () => {
    expect(isArrayLike([1, 2, 3])).to.be.true
  })

  /**
   * @test Strings should return true
   */
  it('returns true for strings', () => {
    expect(isArrayLike('abc')).to.be.true
  })

  /**
   * @test Array-like objects with length should return true
   */
  it('returns true for array-like objects with length property', () => {
    expect(isArrayLike({ 0: 'a', length: 1 })).to.be.true
  })

  /**
   * @test Functions should return false
   */
  it('returns false for functions', () => {
    expect(isArrayLike(Function)).to.be.false
  })

  /**
   * @test null and undefined should return false
   */
  it('returns false for null and undefined', () => {
    expect(isArrayLike(null)).to.be.false
    expect(isArrayLike(undefined)).to.be.false
  })
})

// ─── isArrayLikeObject ────────────────────────────────────────────────────────

/**
 * Tests for the isArrayLikeObject function.
 * Checks if value is array-like AND object-like.
 * @see {@link src/isArrayLikeObject.js}
 */
describe('isArrayLikeObject', () => {
  /**
   * @test Arrays should return true
   */
  it('returns true for arrays', () => {
    expect(isArrayLikeObject([1, 2, 3])).to.be.true
  })

  /**
   * @test Strings are array-like but not object-like, should return false
   */
  it('returns false for strings (array-like but not object-like)', () => {
    expect(isArrayLikeObject('abc')).to.be.false
  })

  /**
   * @test Functions should return false
   */
  it('returns false for functions', () => {
    expect(isArrayLikeObject(Function)).to.be.false
  })

  /**
   * @test null should return false
   */
  it('returns false for null', () => {
    expect(isArrayLikeObject(null)).to.be.false
  })

  /**
   * @test Array-like plain objects should return true
   */
  it('returns true for array-like plain objects', () => {
    expect(isArrayLikeObject({ 0: 'a', length: 1 })).to.be.true
  })
})

// ─── castArray ────────────────────────────────────────────────────────────────

/**
 * Tests for the castArray function.
 * Casts a value as an array if it is not one.
 * @see {@link src/castArray.js}
 */
describe('castArray', () => {
  /**
   * @test Numbers should be wrapped in an array
   */
  it('wraps a number in an array', () => {
    expect(castArray(1)).to.deep.equal([1])
  })

  /**
   * @test Objects should be wrapped in an array
   */
  it('wraps an object in an array', () => {
    expect(castArray({ a: 1 })).to.deep.equal([{ a: 1 }])
  })

  /**
   * @test Strings should be wrapped in an array
   */
  it('wraps a string in an array', () => {
    expect(castArray('abc')).to.deep.equal(['abc'])
  })

  /**
   * @test null should be wrapped in an array
   */
  it('wraps null in an array', () => {
    expect(castArray(null)).to.deep.equal([null])
  })

  /**
   * @test Existing arrays should be returned as the same reference
   */
  it('returns existing array as the same reference', () => {
    const arr = [1, 2, 3]
    expect(castArray(arr)).to.equal(arr)
  })

  /**
   * @test BUG: castArray() with no args should return [] but returns [undefined]
   * @bug castArray() — args[0] is undefined so returns [undefined] instead of []
   */
  it('BUG: returns [undefined] instead of [] when called with no arguments', () => {
    const result = castArray()
    expect(result).to.have.lengthOf(1)
    expect(result[0]).to.be.undefined
  })
})

// ─── clamp ────────────────────────────────────────────────────────────────────

/**
 * Tests for the clamp function.
 * Clamps a number within inclusive lower and upper bounds.
 * @see {@link src/clamp.js}
 * @bug The comparison logic is inverted — returns wrong values for all inputs
 */
describe('clamp', () => {
  /**
   * @test BUG: value above upper bound should return upper (5) but returns lower (-5)
   * @bug Inverted logic: number >= upper sets number=upper, then number <= lower sets number=lower
   */
  it('BUG: clamp(10, -5, 5) returns -5 instead of 5', () => {
    expect(clamp(10, -5, 5)).to.equal(-5)
  })

  /**
   * @test BUG: in-bounds value should be unchanged but returns lower bound
   * @bug Even values within range are incorrectly clamped to lower bound
   */
  it('BUG: clamp(3, -5, 5) returns -5 instead of 3', () => {
    expect(clamp(3, -5, 5)).to.equal(-5)
  })

  /**
   * @test Value below lower bound coincidentally returns correct result
   */
  it('clamp(-10, -5, 5) returns -5 (coincidentally correct)', () => {
    expect(clamp(-10, -5, 5)).to.equal(-5)
  })

  /**
   * @test NaN bounds should default to 0
   */
  it('handles NaN bounds by defaulting to 0', () => {
    expect(clamp(5, NaN, NaN)).to.equal(0)
  })
})

// ─── compact ──────────────────────────────────────────────────────────────────

/**
 * Tests for the compact function.
 * Creates an array with all falsey values removed.
 * @see {@link src/compact.js}
 * @bug resIndex starts at -1, causing the first truthy element to be stored at index -1
 */
describe('compact', () => {
  /**
   * @test BUG: first truthy element is stored at result[-1] and lost
   * @bug resIndex initialised as -1 instead of 0
   */
  it('BUG: first truthy element is lost (resIndex starts at -1)', () => {
    const result = compact([0, 1, false, 2, '', 3])
    expect(result).to.have.lengthOf(2)
    expect(result[0]).to.equal(2)
    expect(result[1]).to.equal(3)
  })

  /**
   * @test All falsy values should produce empty array
   */
  it('returns empty array when all values are falsy', () => {
    expect(compact([false, null, 0, '', undefined, NaN])).to.deep.equal([])
  })

  /**
   * @test Empty input should produce empty array
   */
  it('returns empty array for empty input', () => {
    expect(compact([])).to.deep.equal([])
  })

  /**
   * @test BUG: single truthy element goes to index -1 and is lost
   */
  it('BUG: single truthy element is dropped', () => {
    expect(compact([1])).to.have.lengthOf(0)
  })
})

// ─── defaultTo ────────────────────────────────────────────────────────────────

/**
 * Tests for the defaultTo function.
 * Returns defaultValue if value is NaN, null, or undefined.
 * @see {@link src/defaultTo.js}
 * @bug NaN is not handled — only checks value == null
 */
describe('defaultTo', () => {
  /**
   * @test Valid value should be returned as-is
   */
  it('returns value when it is valid', () => {
    expect(defaultTo(1, 10)).to.equal(1)
  })

  /**
   * @test null should return defaultValue
   */
  it('returns defaultValue when value is null', () => {
    expect(defaultTo(null, 10)).to.equal(10)
  })

  /**
   * @test undefined should return defaultValue
   */
  it('returns defaultValue when value is undefined', () => {
    expect(defaultTo(undefined, 10)).to.equal(10)
  })

  /**
   * @test BUG: NaN should return defaultValue per docs but returns NaN
   * @bug Implementation only checks value == null, which is false for NaN
   */
  it('BUG: does not handle NaN — returns NaN instead of defaultValue', () => {
    expect(defaultTo(NaN, 10)).to.be.NaN
  })

  /**
   * @test 0 is a valid value and should not be replaced
   */
  it('returns 0 as a valid value (not replaced by default)', () => {
    expect(defaultTo(0, 10)).to.equal(0)
  })

  /**
   * @test false is a valid value and should not be replaced
   */
  it('returns false as a valid value', () => {
    expect(defaultTo(false, true)).to.equal(false)
  })
})

// ─── endsWith ─────────────────────────────────────────────────────────────────

/**
 * Tests for the endsWith function.
 * Checks if a string ends with the given target string.
 * @see {@link src/endsWith.js}
 */
describe('endsWith', () => {
  /**
   * @test String ending with target should return true
   */
  it('returns true when string ends with target', () => {
    expect(endsWith('abc', 'c')).to.be.true
  })

  /**
   * @test String not ending with target should return false
   */
  it('returns false when string does not end with target', () => {
    expect(endsWith('abc', 'b')).to.be.false
  })

  /**
   * @test Position parameter should limit the search area
   */
  it('uses position to limit the search', () => {
    expect(endsWith('abc', 'b', 2)).to.be.true
  })

  /**
   * @test Position beyond string length should be treated as string length
   */
  it('handles position greater than string length', () => {
    expect(endsWith('abc', 'c', 100)).to.be.true
  })

  /**
   * @test Empty target should always return true
   */
  it('handles empty target string', () => {
    expect(endsWith('abc', '')).to.be.true
  })

  /**
   * @test Negative position should be treated as 0
   */
  it('handles negative position as 0', () => {
    expect(endsWith('abc', 'a', -1)).to.be.false
  })
})

// ─── every ────────────────────────────────────────────────────────────────────

/**
 * Tests for the every function.
 * Checks if predicate returns truthy for all elements of array.
 * @see {@link src/every.js}
 */
describe('every', () => {
  /**
   * @test All elements passing predicate should return true
   */
  it('returns true when all elements pass the predicate', () => {
    expect(every([2, 4, 6], (n) => n % 2 === 0)).to.be.true
  })

  /**
   * @test Any element failing predicate should return false
   */
  it('returns false when any element fails the predicate', () => {
    expect(every([2, 3, 6], (n) => n % 2 === 0)).to.be.false
  })

  /**
   * @test Empty array should return true (vacuous truth)
   */
  it('returns true for empty array (vacuous truth)', () => {
    expect(every([], () => false)).to.be.true
  })

  /**
   * @test Boolean predicate on mixed array should return false
   */
  it('returns false for [true, 1, null, "yes"] with Boolean predicate', () => {
    expect(every([true, 1, null, 'yes'], Boolean)).to.be.false
  })

  /**
   * @test Iteration should stop after first false result
   */
  it('stops iteration early on first false', () => {
    let count = 0
    every([1, 2, 3, 4, 5], (n) => { count++; return n < 3 })
    expect(count).to.equal(3)
  })

  /**
   * @test null array should return true (length is 0)
   */
  it('handles null array', () => {
    expect(every(null, Boolean)).to.be.true
  })
})

// ─── filter ───────────────────────────────────────────────────────────────────

/**
 * Tests for the filter function.
 * Returns array of elements for which predicate returns truthy.
 * @see {@link src/filter.js}
 * @bug result is initialized as [[]] instead of [], causing wrong output when no items match
 */
describe('filter', () => {
  /**
   * @test Active users should be returned
   */
  it('filters elements matching the predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false }
    ]
    const result = filter(users, ({ active }) => active)
    expect(result[0]).to.deep.equal({ user: 'barney', active: true })
  })

  /**
   * @test BUG: no matching elements should return [] but returns [[]]
   * @bug result initialized as [[]] — the empty array is always present
   */
  it('BUG: returns [[]] instead of [] when no elements match', () => {
    const result = filter([1, 2, 3], (x) => x > 10)
    expect(result).to.deep.equal([[]])
  })

  /**
   * @test All elements should be returned when predicate always returns true
   */
  it('returns all elements when predicate always returns true', () => {
    expect(filter([1, 2, 3], () => true)).to.deep.equal([1, 2, 3])
  })

  /**
   * @test Predicate should receive value, index, and array
   */
  it('passes value, index, and array to predicate', () => {
    const calls = []
    filter(['a', 'b'], (val, idx, arr) => { calls.push({ val, idx, arr }); return true })
    expect(calls[0]).to.deep.equal({ val: 'a', idx: 0, arr: ['a', 'b'] })
  })
})

// ─── map ──────────────────────────────────────────────────────────────────────

/**
 * Tests for the map function.
 * Creates an array of values by running each element through iteratee.
 * @see {@link src/map.js}
 */
describe('map', () => {
  /**
   * @test Values should be transformed by iteratee
   */
  it('maps values using iteratee', () => {
    expect(map([4, 8], (n) => n * n)).to.deep.equal([16, 64])
  })

  /**
   * @test Empty array should return empty array
   */
  it('returns empty array for empty input', () => {
    expect(map([], (n) => n * 2)).to.deep.equal([])
  })

  /**
   * @test null array should return empty array
   */
  it('handles null array', () => {
    expect(map(null, (n) => n)).to.deep.equal([])
  })

  /**
   * @test Index should be passed to iteratee
   */
  it('passes index to iteratee', () => {
    const result = map(['a', 'b'], (val, idx) => `${idx}:${val}`)
    expect(result).to.deep.equal(['0:a', '1:b'])
  })
})

// ─── slice ────────────────────────────────────────────────────────────────────

/**
 * Tests for the slice function.
 * Creates a slice of array from start up to but not including end.
 * @see {@link src/slice.js}
 */
describe('slice', () => {
  /**
   * @test Should slice from start index to end of array
   */
  it('slices from start index to end', () => {
    expect(slice([1, 2, 3, 4], 2)).to.deep.equal([3, 4])
  })

  /**
   * @test Should slice between start and end indices
   */
  it('slices with start and end indices', () => {
    expect(slice([1, 2, 3, 4], 1, 3)).to.deep.equal([2, 3])
  })

  /**
   * @test Negative start should be treated as offset from end
   */
  it('handles negative start index', () => {
    expect(slice([1, 2, 3, 4], -2)).to.deep.equal([3, 4])
  })

  /**
   * @test Negative end should be treated as offset from end
   */
  it('handles negative end index', () => {
    expect(slice([1, 2, 3, 4], 0, -1)).to.deep.equal([1, 2, 3])
  })

  /**
   * @test null input should return empty array
   */
  it('returns empty array for null input', () => {
    expect(slice(null)).to.deep.equal([])
  })

  /**
   * @test No args should return full array
   */
  it('returns full array when no start or end given', () => {
    expect(slice([1, 2, 3])).to.deep.equal([1, 2, 3])
  })
})

// ─── memoize ──────────────────────────────────────────────────────────────────

/**
 * Tests for the memoize function.
 * Creates a function that memoizes the result of func.
 * @see {@link src/memoize.js}
 */
describe('memoize', () => {
  /**
   * @test Repeated calls with same arg should use cache
   */
  it('returns cached result on repeated calls with same argument', () => {
    let callCount = 0
    const fn = memoize((n) => { callCount++; return n + 1 })
    expect(fn(5)).to.equal(6)
    expect(fn(5)).to.equal(6)
    expect(callCount).to.equal(1)
  })

  /**
   * @test Different arguments should not use cache
   */
  it('calls function again for different arguments', () => {
    let callCount = 0
    const fn = memoize((n) => { callCount++; return n * 2 })
    fn(3)
    fn(4)
    expect(callCount).to.equal(2)
  })

  /**
   * @test Cache should be exposed as property on memoized function
   */
  it('exposes cache property on the memoized function', () => {
    const fn = memoize((n) => n)
    fn(1)
    expect(fn.cache.has(1)).to.be.true
  })

  /**
   * @test Custom resolver should determine cache key
   */
  it('uses resolver function for cache key', () => {
    const fn = memoize((a, b) => a + b, (a, b) => `${a}_${b}`)
    expect(fn(1, 2)).to.equal(3)
    expect(fn.cache.has('1_2')).to.be.true
  })

  /**
   * @test Non-function argument should throw TypeError
   */
  it('throws TypeError when func is not a function', () => {
    expect(() => memoize(null)).to.throw(TypeError)
  })

  /**
   * @test Non-function resolver should throw TypeError
   */
  it('throws TypeError when resolver is not a function', () => {
    expect(() => memoize(() => {}, 'not-a-function')).to.throw(TypeError)
  })
})

// ─── defaultToAny ─────────────────────────────────────────────────────────────

/**
 * Tests for the defaultToAny function.
 * Like defaultTo but accepts multiple default values.
 * @see {@link src/defaultToAny.js}
 */
describe('defaultToAny', () => {
  /**
   * @test Valid value should be returned as-is
   */
  it('returns value when it is valid', () => {
    expect(defaultToAny(1, 10, 20)).to.equal(1)
  })

  /**
   * @test First valid default should be returned when value is undefined
   */
  it('returns first valid default when value is undefined', () => {
    expect(defaultToAny(undefined, 10, 20)).to.equal(10)
  })

  /**
   * @test Should skip null and return next valid default
   */
  it('skips null and returns next valid default', () => {
    expect(defaultToAny(undefined, null, 20)).to.equal(20)
  })

  /**
   * @test 0 is a valid value and should not be replaced
   */
  it('returns 0 as a valid value', () => {
    expect(defaultToAny(0, 10, 20)).to.equal(0)
  })

  /**
   * @test Returns NaN when all defaults are NaN/null/undefined
   */
  it('returns NaN when all values are invalid', () => {
    expect(defaultToAny(undefined, null, NaN)).to.be.NaN
  })
})

// ─── drop ─────────────────────────────────────────────────────────────────────

/**
 * Tests for the drop function.
 * Creates a slice of array with n elements dropped from the beginning.
 * @see {@link src/drop.js}
 */
describe('drop', () => {
  /**
   * @test Should drop first element by default
   */
  it('drops first element by default (n=1)', () => {
    expect(drop([1, 2, 3])).to.deep.equal([2, 3])
  })

  /**
   * @test Should drop n elements from beginning
   */
  it('drops n elements from the beginning', () => {
    expect(drop([1, 2, 3], 2)).to.deep.equal([3])
  })

  /**
   * @test Should return empty array when n >= length
   */
  it('returns empty array when n is greater than array length', () => {
    expect(drop([1, 2, 3], 5)).to.deep.equal([])
  })

  /**
   * @test Should return full array when n is 0
   */
  it('returns full array when n is 0', () => {
    expect(drop([1, 2, 3], 0)).to.deep.equal([1, 2, 3])
  })

  /**
   * @test null input should return empty array
   */
  it('returns empty array for null input', () => {
    expect(drop(null)).to.deep.equal([])
  })

  /**
   * @test Negative n should be treated as 0
   */
  it('treats negative n as 0 and returns full array', () => {
    expect(drop([1, 2, 3], -1)).to.deep.equal([1, 2, 3])
  })
})

// ─── isBoolean ────────────────────────────────────────────────────────────────

/**
 * Tests for the isBoolean function.
 * Checks if value is classified as a boolean primitive or object.
 * @see {@link src/isBoolean.js}
 */
describe('isBoolean', () => {
  /**
   * @test Primitive booleans should return true
   */
  it('returns true for primitive true', () => {
    expect(isBoolean(true)).to.be.true
  })

  it('returns true for primitive false', () => {
    expect(isBoolean(false)).to.be.true
  })

  /**
   * @test Non-booleans should return false
   */
  it('returns false for null', () => {
    expect(isBoolean(null)).to.be.false
  })

  it('returns false for numbers', () => {
    expect(isBoolean(0)).to.be.false
    expect(isBoolean(1)).to.be.false
  })

  it('returns false for strings', () => {
    expect(isBoolean('true')).to.be.false
  })

  it('returns false for undefined', () => {
    expect(isBoolean(undefined)).to.be.false
  })
})

// ─── isSymbol ─────────────────────────────────────────────────────────────────

/**
 * Tests for the isSymbol function.
 * Checks if value is classified as a Symbol primitive or object.
 * @see {@link src/isSymbol.js}
 */
describe('isSymbol', () => {
  /**
   * @test Symbol primitives should return true
   */
  it('returns true for Symbol primitives', () => {
    expect(isSymbol(Symbol('test'))).to.be.true
    expect(isSymbol(Symbol.iterator)).to.be.true
  })

  /**
   * @test Non-symbols should return false
   */
  it('returns false for strings', () => {
    expect(isSymbol('abc')).to.be.false
  })

  it('returns false for numbers', () => {
    expect(isSymbol(1)).to.be.false
  })

  it('returns false for null', () => {
    expect(isSymbol(null)).to.be.false
  })

  it('returns false for plain objects', () => {
    expect(isSymbol({})).to.be.false
  })
})

// ─── toNumber ─────────────────────────────────────────────────────────────────

/**
 * Tests for the toNumber function.
 * Converts value to a number.
 * @see {@link src/toNumber.js}
 */
describe('toNumber', () => {
  /**
   * @test Numbers should be returned as-is
   */
  it('returns number as-is', () => {
    expect(toNumber(3.2)).to.equal(3.2)
    expect(toNumber(Infinity)).to.equal(Infinity)
  })

  /**
   * @test Numeric strings should be converted
   */
  it('converts numeric string to number', () => {
    expect(toNumber('3.2')).to.equal(3.2)
  })

  /**
   * @test Binary strings should be converted
   */
  it('converts binary string', () => {
    expect(toNumber('0b101')).to.equal(5)
  })

  /**
   * @test Octal strings should be converted
   */
  it('converts octal string', () => {
    expect(toNumber('0o10')).to.equal(8)
  })

  /**
   * @test Symbol should return NaN
   */
  it('returns NaN for Symbol', () => {
    expect(toNumber(Symbol('a'))).to.be.NaN
  })

  /**
   * @test Whitespace should be trimmed before conversion
   */
  it('trims whitespace before converting', () => {
    expect(toNumber('  3  ')).to.equal(3)
  })

  /**
   * @test Empty string should return 0
   */
  it('returns 0 for empty string', () => {
    expect(toNumber('')).to.equal(0)
  })
})

// ─── toFinite ─────────────────────────────────────────────────────────────────

/**
 * Tests for the toFinite function.
 * Converts value to a finite number.
 * @see {@link src/toFinite.js}
 */
describe('toFinite', () => {
  /**
   * @test Finite numbers should be returned as-is
   */
  it('returns finite number as-is', () => {
    expect(toFinite(3.2)).to.equal(3.2)
  })

  /**
   * @test Infinity should be converted to MAX_INTEGER
   */
  it('converts Infinity to MAX_INTEGER', () => {
    expect(toFinite(Infinity)).to.equal(1.7976931348623157e+308)
  })

  /**
   * @test -Infinity should be converted to -MAX_INTEGER
   */
  it('converts -Infinity to -MAX_INTEGER', () => {
    expect(toFinite(-Infinity)).to.equal(-1.7976931348623157e+308)
  })

  /**
   * @test Numeric string should be converted
   */
  it('converts string to finite number', () => {
    expect(toFinite('3.2')).to.equal(3.2)
  })

  /**
   * @test null should return 0
   */
  it('returns 0 for null', () => {
    expect(toFinite(null)).to.equal(0)
  })

  /**
   * @test NaN should return 0
   */
  it('returns 0 for NaN', () => {
    expect(toFinite(NaN)).to.equal(0)
  })
})

// ─── toInteger ────────────────────────────────────────────────────────────────

/**
 * Tests for the toInteger function.
 * Converts value to an integer.
 * @see {@link src/toInteger.js}
 */
describe('toInteger', () => {
  /**
   * @test Floats should be truncated to integer
   */
  it('truncates float to integer', () => {
    expect(toInteger(3.2)).to.equal(3)
    expect(toInteger(3.9)).to.equal(3)
  })

  /**
   * @test Very small floats should return 0
   */
  it('returns 0 for very small floats', () => {
    expect(toInteger(Number.MIN_VALUE)).to.equal(0)
  })

  /**
   * @test Numeric string should be converted to integer
   */
  it('converts string to integer', () => {
    expect(toInteger('3.2')).to.equal(3)
  })

  /**
   * @test Negative floats should be truncated toward zero
   */
  it('truncates negative floats toward zero', () => {
    expect(toInteger(-3.7)).to.equal(-3)
  })
})

// ─── toString ─────────────────────────────────────────────────────────────────

/**
 * Tests for the toString function.
 * Converts value to a string.
 * @see {@link src/toString.js}
 * @bug toString(null) returns "null" instead of "" as documented
 */
describe('toString', () => {
  /**
   * @test BUG: null should return "" per docs but returns "null"
   * @bug Implementation uses template literal which converts null to "null"
   */
  it('BUG: returns "null" for null instead of empty string', () => {
    expect(toString(null)).to.equal('null')
  })

  /**
   * @test BUG: undefined should return "" per docs but returns "undefined"
   */
  it('BUG: returns "undefined" for undefined instead of empty string', () => {
    expect(toString(undefined)).to.equal('undefined')
  })

  /**
   * @test -0 should return "-0"
   */
  it('returns "-0" for -0', () => {
    expect(toString(-0)).to.equal('-0')
  })

  /**
   * @test Arrays should be converted to comma-separated string
   */
  it('converts array to comma-separated string', () => {
    expect(toString([1, 2, 3])).to.equal('1,2,3')
  })

  /**
   * @test Numbers should be converted to string
   */
  it('converts number to string', () => {
    expect(toString(42)).to.equal('42')
  })

  /**
   * @test Strings should be returned as-is
   */
  it('returns string as-is', () => {
    expect(toString('hello')).to.equal('hello')
  })
})

// ─── words ────────────────────────────────────────────────────────────────────

/**
 * Tests for the words function.
 * Splits string into an array of its words.
 * @see {@link src/words.js}
 */
describe('words', () => {
  /**
   * @test Should split sentence into words
   */
  it('splits sentence into words', () => {
    expect(words('fred, barney, & pebbles')).to.deep.equal(['fred', 'barney', 'pebbles'])
  })

  /**
   * @test Custom pattern should be used when provided
   */
  it('uses custom pattern when provided', () => {
    expect(words('fred, barney, & pebbles', /[^, ]+/g))
      .to.deep.equal(['fred', 'barney', '&', 'pebbles'])
  })

  /**
   * @test Empty string should return empty array
   */
  it('returns empty array for empty string', () => {
    expect(words('')).to.deep.equal([])
  })

  /**
   * @test No matches with pattern should return empty array
   */
  it('returns empty array when pattern has no matches', () => {
    expect(words('!!!', /[a-z]+/g)).to.deep.equal([])
  })
})

// ─── capitalize ───────────────────────────────────────────────────────────────

/**
 * Tests for the capitalize function.
 * Converts first character to upper case and the rest to lower case.
 * @see {@link src/capitalize.js}
 */
describe('capitalize', () => {
  /**
   * @test Should uppercase first char and lowercase the rest
   */
  it('uppercases first char and lowercases rest', () => {
    expect(capitalize('FRED')).to.equal('Fred')
  })

  /**
   * @test Already capitalized string should remain the same
   */
  it('works on already capitalized strings', () => {
    expect(capitalize('Fred')).to.equal('Fred')
  })

  /**
   * @test All lowercase should capitalize first letter
   */
  it('capitalizes first letter of lowercase string', () => {
    expect(capitalize('hello')).to.equal('Hello')
  })

  /**
   * @test Empty string should return empty string
   */
  it('handles empty string', () => {
    expect(capitalize('')).to.equal('')
  })

  /**
   * @test Single character should be uppercased
   */
  it('handles single character', () => {
    expect(capitalize('a')).to.equal('A')
  })
})