
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



export {
    filterListTasks,
    getSelected,
    isSomeSelected,
    selectFirst
}
