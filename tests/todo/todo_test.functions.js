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

const getSelected = (arrElements) => {
    if (!arrElements) {
        return null;
    }

    if (isSomeSelected(arrElements)) {
        selectFirst(arrElements);

        return arrElements[0];
    }

    let selected = null;
    arrElements.forEach(element => {
        if (element.selected) {
            selected = element;
        }
    });

    return selected;
}

// Aux. of getSelected()
const isSomeSelected = (arrElements) => {
    let selectedFlag = false;
    arrElements.forEach(element => {
        if (element.selected) {
            selectedFlag = true;
        }
    });

    return selectedFlag
}

// Aux. of getSelected()
const selectFirst = (arrElements) => {
    arrElements[0].selected = true;

    return arrElements;
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
