// import { isEmptyArray } from './arrays.js';

/**
 * Return the tasks of different lists
 *
 * @param string listId
 * @param array  arrAllTasks
 * @param array
 */
const cleanTasksOfList = (listId, arrAllTasks) =>
{
    if (!arrAllTasks ||
        (typeof (arrAllTasks) !== 'object' || !Array.isArray(arrAllTasks))) {
        return [];
    }

    const arrCleanedTasks = [];
    arrAllTasks.forEach(task => {
        if (task.listId !== listId) {
            arrCleanedTasks.push(task);
        }
    });

    return arrCleanedTasks;
}

/**
 * Return the tasks belong to some list
 *
 * @param array  arrAllList
 * @param array  arrAllTasks
 * @param array
 */
const cleanTasksWithoutList = (arrAllList, arrAllTasks) =>
{
    if ((!arrAllList || typeof (arrAllList) !== 'object' || !Array.isArray(arrAllList)) ||
        (!arrAllTasks || typeof (arrAllTasks) !== 'object' || !Array.isArray(arrAllTasks))) {

        return [];
    }

    const storedListIds = getIds(arrAllList);

    const arrCleanedTasks = [];
    arrAllTasks.forEach(task => {
        if (storedListIds.includes(task.listId)) {
            arrCleanedTasks.push(task);
        }
    });

    return arrCleanedTasks;
}

const find = (data, id) =>
{
    let result = {};
    data.map(item => {
        if (item.id === id) {
            result = item;
        }

        return null;
    });

    return result;
}

const getIds = (data) =>
{
    const result = [];

    if (data && typeof (data) === 'object' && Array.isArray(data)) {
        data.map(item => {
            if (item.id) {
                result.push(item.id)
            }

            return null;
        });
    }

    return result;
}

const getListIdsFromTasks = (data) =>
{
    const result = [];
    data.map(item => {
        if (item.listId && !result.includes(item.listId)) {
            result.push(item.listId)
        }

        return null;
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

    return allTasks.length
        ? allTasks.filter(checkId(listId))
        : [];
}

/**
 * Get the object with selected === true
 *
 * @param array  arrElements
 * @param object elements
 */
const getSelected = (arrElements) =>
{
    if (!arrElements) {
        return null;
    }

    let selected = null;
    arrElements.forEach(element => {
        if (element.selected) {
            selected = element;
        }
    });

    return selected;
}

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

const markCardAsCompleted = (cards, cardId) =>
{
    cards.forEach(card => {
        if (card.id === cardId) {
            card.completed = true;
        }
    });

    return cards;
}

const setCardText = (cards, cardId, text) =>
{
    cards.forEach(card => {
        if (card.id === cardId) {
            card.text = text;
        }
    });

    return cards;
}

const selectCardColor = (cards, cardId, color) =>
{
    cards.forEach(card => {
        if (card.id === cardId) {
            card.color = color;
        }
    });

    return cards;
}

const selectFirst = (arrElements) =>
{
    arrElements[0].selected = true;

    return arrElements;
}

/**
 * Return updated tasks
 *
 * activeTasksToStore contents "alive tasks" (state's tasks of the selected list)
 * originally loaded, added and modified tasks
 *
 * tasksFromStorage has the stored tasks for all the lists:
 * this data will be updated (only the tasks of the selected list)
 *
 * All the tasks into tasksFromStorage of no selected list will be returned
 * All the tasks into activeTasksToStore will be returned
 *
 * @param array activeTasksToStore
 * @param array tasksFromStorage
 * @param array
 */
const updateSelectedListTasks = (listId, activeTasksToStore, tasksFromStorage) =>
{
    if (!tasksFromStorage) {
        return activeTasksToStore;
    }

    const noSelectedListTasks = cleanTasksOfList(listId, tasksFromStorage);


    return activeTasksToStore.concat(noSelectedListTasks);
}


export {
    cleanTasksWithoutList,
    find,
    getIds,
    getListIdsFromTasks,
    getSelected,
    getTasksOfList,
    updateSelectedListTasks,
    isSomeSelected,
    markCardAsCompleted,
    selectCardColor,
    selectFirst,
    setCardText
}
