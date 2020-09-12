

const getRandomNunber = (number = 100000) =>
{
    return Math.round(Math.random() * number);
}

const updateTasks = (activeTasks, storedTasks) =>
{
    const result = [];
    const data = storedTasks.map(
        (storedTask, i) =>
        {
            for (let index = 0; index < activeTasks.length; index++) {
                const activeTask = activeTasks[index];

                if (storedTask.id === activeTask.id) {
                    const updatedTask = activeTask;

                    // NOTE: the task could be modified
                    result.push(updatedTask);
                }
            }
        }
    );
    return result;
    return data.filter(
        element =>
        { if (element !== {})
            return element;
        }
    );
}

const isTaskInTheList = (task, listId) =>
{
    return (task.listId === listId);
}

function getTasksInList(tasks, listId)
{

    return tasks.filter((item, listId) => {
        if (isTaskInTheList(item, listId)) {
            return item;
        }
    })
    const result = [];

    return result;
}

function getTasksNotInList(tasks, listId) {
    const result = [];

    return result;
}
/*
From helpers/todo.js:

    getIds
    getListIdsFromTasks
    getTasksOfList
    getSelected
    isSomeSelected
    selectFirst
    updateTasks
*/
