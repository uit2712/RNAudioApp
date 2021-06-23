import { dynamicSort, formatTimeString, listToMatrix, shuffleArray } from '@functions/index';

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
                    `${JSON.stringify(result)} expected is one of ${JSON.stringify(received)} `,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `${JSON.stringify(result)} expected is not one of ${JSON.stringify(received)} `,
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

    const data = [{ name: 'ab', }, { name: 'cd', }];
    test(`shuffleArray: input (${JSON.stringify(data)}) is one of [[{ name: 'ab', }, { name: 'cd', }], [{ name: 'cd', }, { name: 'ab', }]]`, () => {
        expect(shuffleArray(data)).toBeOneOf([[{ name: 'ab', }, { name: 'cd', }], [{ name: 'cd', }, { name: 'ab', }]]);
    });
});

describe('dynamicSort', () => {
    test('dynamicSort: input ([], "") get []', () => {
        expect([].sort(dynamicSort(''))).toEqual([]);
    });

    test('dynamicSort: input ([2, 3, 4], "") get [2,3,4]', () => {
        expect([2,3,4].sort(dynamicSort(''))).toEqual([2,3,4]);
    });

    const data = [
        { 
            name: 'cd',
            age: 30,
        },
        { 
            name: 'ab',
            age: 40,
        }
    ]
    test(`dynamicSort: input (${JSON.stringify(data)}, '') get ${JSON.stringify(data)}`, () => {
        expect(data.sort(dynamicSort(''))).toEqual(data);
    });

    test(`dynamicSort: input (${JSON.stringify(data)}, 'name') get ${JSON.stringify([{ 
        name: 'ab',
        age: 40,
    }, { 
        name: 'cd',
        age: 30,
    }])}`, () => {
        expect(data.sort(dynamicSort('name'))).toEqual([{ 
            name: 'ab',
            age: 40,
        }, { 
            name: 'cd',
            age: 30,
        }]);
    });

    test(`dynamicSort: input (${JSON.stringify(data)}, 'age') get ${JSON.stringify(data)}`, () => {
        expect(data.sort(dynamicSort('age'))).toEqual(data);
    });

    const data1 = [
        { 
            name: 'cd',
            age: undefined,
        },
        { 
            name: 'ab',
            age: 40,
        }
    ]
    test(`dynamicSort: input (${JSON.stringify(data1)}, 'age') get ${JSON.stringify(data1)}`, () => {
        expect(data1.sort(dynamicSort('age'))).toEqual(data1);
    });
    test(`dynamicSort: input (${JSON.stringify(data1)}, 'name') get ${JSON.stringify([
        { 
            name: 'ab',
            age: 40,
        },
        { 
            name: 'cd',
            age: undefined,
        },
    ])}`, () => {
        expect(data1.sort(dynamicSort('name'))).toEqual([
            { 
                name: 'ab',
                age: 40,
            },
            { 
                name: 'cd',
                age: undefined,
            },
        ]);
    });
});