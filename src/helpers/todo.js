import { clearUndefinedArrayPositions } from './arrays.js';

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

const getListIdsFromTasks = (data) =>
{
    const result = [];
    data.map(item => {
        if (item.listId && !result.includes(item.listId)) {
            result.push(item.listId)
        }
    });

    return result;
}

const getTasksOfList = (allTasks, listId) =>
{
    function checkId(listId)
    {
        return function (element)
        {
            return element.listId === listId;
        }
    }

    return allTasks.filter(checkId(listId));
}

const getSelected = (arrElements) =>
{
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
const isSomeSelected = (arrElements) =>
{
    let selectedFlag = false;
    arrElements.forEach(element => {
        if (element.selected) {
            selectedFlag = true;
        }
    });

    return selectedFlag
}

// Aux. of getSelected()
const selectFirst = (arrElements) =>
{
    arrElements[0].selected = true;

    return arrElements;
}

/**
 *
 * @param array activeTasksToStore
 * @param array tasksFromStorages
 * @param array -> the task stored in both arrays
 */
const getUpdatedTasksToStore = (activeTasksToStore, tasksFromStorages) =>
{
    const data = tasksFromStorages.map(
        (taskFromStorage, i) => {
            const numberOfTasksToStore = activeTasksToStore.length;

            for (let index = 0; index < numberOfTasksToStore; index++) {
                const activeTask = activeTasksToStore[index];

                if (taskFromStorage.id === activeTask.id) {
                    const updatedTask = activeTask;

                    return updatedTask;
                }
            }

            // the task was deleted!
        }
    );

    return clearUndefinedArrayPositions(data);
}


export {
    getIds,
    getSelected,
    getTasksOfList,
    getUpdatedTasksToStore,
    isSomeSelected,
    selectFirst
}
