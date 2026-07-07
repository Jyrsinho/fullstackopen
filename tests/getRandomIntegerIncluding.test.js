import {describe, expect, test} from "vitest";
import { getRandomIntegerIncluding} from '../utilities/math_utilities.js'
import fc from 'fast-check';

describe('getRandomIntegerIncluding', () => {
    test('should return random integer between and including min and max', () => {
        fc.assert(
            fc.property(
                fc.integer({min:0, max: 100}),
                fc.integer({min: 100,max: 200}),
                (min, max) => {
                const randomInteger = getRandomIntegerIncluding(min, max);
                expect(Number.isInteger(randomInteger)).toBe(true);
                expect(randomInteger).toBeGreaterThanOrEqual(min)
                expect(randomInteger).toBeLessThanOrEqual(max)
            } )
        )
    })
    test('should throw an error when min is greater than max', () => {
        expect(() => getRandomIntegerIncluding(10, 5)).toThrow();
    })
})