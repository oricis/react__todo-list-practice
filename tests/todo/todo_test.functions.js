// Functions from "src/helpers/todo.js"

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

const getListIdsFromTasks = (data) => {
    const result = [];
    data.map(item => {
        if (item.listId && ! result.includes(item.listId)) {
            result.push(item.listId)
        }
    });

    return result;
}

const getTasksOfList = (allTasks, listId) => {
    function checkId(listId) {
        return function (element) {
            return element.listId === listId;
        }
    }

    return allTasks.filter(checkId(listId));
}

/*
Functions on "helpers / todo.js":

    getIds
    getListIdsFromTasks
    getTasksOfList
    getSelected
    isSomeSelected
    selectFirst
    updateTasks
*/
