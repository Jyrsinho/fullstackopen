import {describe, expect, test} from "vitest";
import {countAverage} from '../utilities/math_utilities.js'
import fc from 'fast-check';

describe('countAverage', () => {
    test('returns zero when no reviews', () => {
        const testNoReviews = {
            good: 0,
            neutral: 0,
            bad: 0,
        }
        expect(countAverage(testNoReviews)).toBe(0)
    })
    test('returns one when only one review and that is positive', () => {
        const testOnePositiveReview = {
            good: 1,
            neutral: 0,
            bad: 0,
        }
        expect(countAverage(testOnePositiveReview)).toBe(1);
    })
    test('returns negative one when only one review and that is negative', () => {
        const testOneNegativeReview = {
            good: 0,
            neutral: 0,
            bad: 1
        }
        expect(countAverage(testOneNegativeReview)).toBe(-1);
    })
    test('returns zero when only one review and that is neutral', () => {
        const testOneNeutralReview = {
            good: 0,
            neutral: 1,
            bad: 0,
        }
        expect(countAverage(testOneNeutralReview)).toBe(0);
    })
    test('average is always between 1 and -1', () => {
        fc.assert(
            fc.property( fc.nat(), fc.nat(), fc.nat(), (good, neutral, bad) => {
                const average = countAverage({ good, neutral, bad } );
                expect(average).toBeGreaterThanOrEqual(-1);
                expect(average).toBeLessThanOrEqual(1);
            }))});
})