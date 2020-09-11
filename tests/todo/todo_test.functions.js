const getIds = (data) =>
{
    const result = [];
    data.map(item => {
        if (item.id) {
            result.push(item.id)
        }
    });

    return result;
}

/*
Functions on "helpers / todo.js":

    filterListTasks
    getIds
    getSelected
    isSomeSelected
    selectFirst
    updateTasks
*/
