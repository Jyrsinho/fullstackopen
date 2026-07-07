import {describe, expect, test} from "vitest";
import {findPersonByName} from "../utilities/person_utilites";

describe('personExists', () => {
    test('should return null when searching an empty array', () => {
        const testPersons = []
        const testName = 'Test Person';
        expect(findPersonByName(testPersons,testName)).toBeNull();
    })
    test('should return null when searching new name from array with different instance', () => {
        const testPersons = [
            {name: 'Test Person'},
        ]
        const newPerson = 'Different Person';
        expect(findPersonByName(testPersons, newPerson)).toBeFalsy();
    })
    test('should return true when searching existing name', () => {
        const testPersons = [
            {name: 'Test Person'},
        ]
        const newPerson =  'Test Person'
        expect(findPersonByName(testPersons, newPerson)).toBeTruthy();
    })
    test('should return truthy when searching existing name in lowercase', () => {
        const testPersons = [
            {name: 'Test Person'},
        ]
        const newPerson =  'test person'
        expect(findPersonByName(testPersons, newPerson)).toBeTruthy();
    })
    test('should return true when searching existing name with empty spaces', () => {
        const testPersons = [
            {name: 'Test Person'},
        ]
        const newPerson = '   Test Person    '
        expect(findPersonByName(testPersons, newPerson)).toBeTruthy();
    })
});