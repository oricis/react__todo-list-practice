const clearUndefinedArrayPositions = (arr) => {
    const result = [];
    arr.forEach(element => {
        if (typeof element !== 'undefined') {
            result.push(element);
        }
    });

    return result;
}

export {
    clearUndefinedArrayPositions
}
