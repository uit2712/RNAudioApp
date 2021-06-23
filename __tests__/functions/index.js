import { formatTimeString, listToMatrix, shuffleArray } from '@functions/index';

describe('formatTimeString', () => {
    test('formatTimeString: format time 35000 miliseconds is 00:02:30', () => {
        expect(formatTimeString(35000)).toBe('00:00:35');
    });
    
    test('formatTimeString: format time 350000 miliseconds is 00:05:50', () => {
        expect(formatTimeString(350000)).toBe('00:05:50');
    });

    test('formatTimeString: format time -1 miliseconds is 00:00:00', () => {
        expect(formatTimeString(-1)).toBe('00:00:00');
    });
});

describe('listToMatrix', () => {
    test('listToMatrix: input ([1, 2, 3], 2) get [[1, 2], [3]]', () => {
        expect(listToMatrix([1, 2, 3], 2)).toStrictEqual([[1, 2], [3]]);
    });
    
    test('listToMatrix: input ([]) get []', () => {
        expect(listToMatrix([], 2)).toStrictEqual([]);
    });
    
    test('listToMatrix: input ([], -1) get []', () => {
        expect(listToMatrix([], -1)).toStrictEqual([]);
    });
    
    test('listToMatrix: input ([], 0) get []', () => {
        expect(listToMatrix([], 0)).toStrictEqual([]);
    });
});

expect.extend({
    toBeOneOf(received, result = []) {
        let pass = false;
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if (JSON.stringify(element) == JSON.stringify(received)) {
                pass = true;
                index = result.length;
            }
        }
        if (pass) {
            return {
                message: () =>
                    `expected ${received} is one of ${result}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} is not one of ${result}`,
                pass: false,
            };
        }
    },
});

describe('shuffleArray', () => {

    test('shuffleArray: input ([1, 2, 3]) => length: 3', () => {
        expect(shuffleArray([1, 2, 3]).length).toEqual(3);
    });

    test('shuffleArray: input ([]) get []', () => {
        expect(shuffleArray([])).toEqual([]);
    });

    test('shuffleArray: input ([1, 2, 3]) is one of [1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]', () => {
        expect(shuffleArray([1, 2, 3])).toBeOneOf([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]);
    });
});