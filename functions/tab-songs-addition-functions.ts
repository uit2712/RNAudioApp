export function distinct<T>(arr: Array<any>, propName: string) {
    let unique: Array<any> = [];
    let distinct = [];
    for(let i = 0; i < arr.length; i++ ){
        if(!unique[arr[i][propName]]){
            distinct.push(arr[i][propName]);
            unique[arr[i][propName]] = arr[i];
        }
    }

    let result: T[] = [];
    let keys = Object.keys(unique);
    keys.forEach(function(key: any){
        result.push(unique[key]);
    });

    return result;
}