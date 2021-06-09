/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

export function formatTimeString(miliseconds: number) {
    return miliseconds > 0 ? new Date(miliseconds).toISOString().substr(11, 8) : '';
}

export function listToMatrix<T>(list: T[], elementsPerSubArray: number): Array<T[]> {
    if (elementsPerSubArray <= 0) {
        return [];
    }

    let matrix: Array<T[]> = [];
    let i: number;
    let k: number;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

export function dynamicSort(property: string) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a: any, b: any) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        if (!a[property]) {
            return sortOrder * 1;
        }

        if (!b[property]) {
            return sortOrder * -1;
        }

        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}