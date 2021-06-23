import { formatTimeString, listToMatrix } from '@functions/index';

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