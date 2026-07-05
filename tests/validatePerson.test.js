import {describe, expect, test} from "vitest";
import {isValidPerson} from "../utilities/validatePerson";

describe('validatePerson', () => {
    test('should return true when adding new Name to empty array', () => {
        const testPersons = []
        const newPerson = {name: 'Test Person'}
        expect(isValidPerson(newPerson,testPersons)).toBeTruthy();
    })
    test('should return true when adding new name to array with one instance', () => {
        const testPersons = [
            {name: 'Test Person'},
        ]
        const newPerson = {name: 'Different Person'}
        expect(isValidPerson(newPerson,testPersons)).toBeTruthy();
    })
    test('should return false when adding already existing name to persons', () => {
        const testPersons = [
            {name: 'Test Person'},
        ]
        const newPerson = {name: 'Test Person'}
        expect(isValidPerson(newPerson,testPersons)).toBeFalsy();
    })
    test('should return false when adding existing name in lowercase', () => {
        const testPersons = [
            {name: 'Test Person'},
        ]
        const newPerson = {name: 'test person'}
        expect(isValidPerson(newPerson,testPersons)).toBeFalsy();
    })
    test('should return false when adding new name in with empty spaces', () => {
        const testPersons = [
            {name: 'Test Person'},
        ]
        const newPerson = {name: '   Test Person    '}
        expect(isValidPerson(newPerson,testPersons)).toBeFalsy();
    })
});