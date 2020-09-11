
const filterListTasks = (tasks, listId) =>
{
    function checkId(listId)
    {
        return function (element)
        {
            return element.listId === listId;
        }
    }

    return tasks.filter(checkId(listId));
}

const getIds = (data) => {
    const result = [];
    data.map(item => {
        if (item.id) {
            result.push(item.id)
        }
    });

    return result;
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
    filterListTasks,
    getSelected,
    isSomeSelected,
    selectFirst,
    updateTasks
}
