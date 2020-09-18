// Functions from "src/helpers/arrays.js"

const clearUndefinedArrayPositions = (arr) =>
{
    const result = [];
    arr.forEach(element => {
        if (typeof element !== 'undefined') {
            result.push(element);
        }
    });

    return result;
}

const isEmptyArray = (arr) =>
{
    return Array.isArray(arr) && arr.length === 0
}
