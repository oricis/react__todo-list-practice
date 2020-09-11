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

const getSelected = (elements) =>
{
    if (!elements) {
        return null;
    }

    if (isSomeSelected(elements)) {
        selectFirst(elements);

        return elements[0];
    }

    let selected = null;
    elements.forEach(element => {
        if (element.selected) {
            selected = element;
        }
    });

    return selected;
}

const isSomeSelected = (elements) =>
{
    let selectedFlag = false;
    elements.forEach(element => {
        if (element.selected) {
            selectedFlag = true;
        }
    });

    return selectedFlag
}

const selectFirst = (elements) =>
{
    elements[0].selected = true;

    return elements;
}

const updateTasks = (activeTasks, storedTasks) =>
{
    const data = storedTasks.map(
        (storedTask, i) => {
            for (let index = 0; index < activeTasks.length; index++) {
                const activeTask = activeTasks[index];

                if (storedTask.id === activeTask.id) {
                    const updatedTask = activeTask;

                    return updatedTask;
                }
            }

            // the task was deleted!
            return {};
        }
    );
    console.log(data);

    return data;
}


export {
    getIds,
    getTasksOfList,
    getSelected,
    isSomeSelected,
    selectFirst,
    updateTasks
}
