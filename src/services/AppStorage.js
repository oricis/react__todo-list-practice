/**
 * Class to handle stored data
 *
 * Moisés Alcocer, 2020
 * contacto@ironwoods.es
 */

import Storage from './Storage.js';
import {
    cleanTasksWithoutList,
    updateSelectedListTasks,
} from '../helpers/todo.js';

class AppStorage
{
    LISTS_KEY = 'stored-lists';
    TASKS_KEY = 'stored-tasks';


    constructor()
    {
        this.storage = new Storage();
    }

    deleteStoredTasks = () =>
    {
        this.storeTasks([]);
    }

    deleteStoredOrphanTasks = () =>
    {
        const tasks = this.loadStoredTasks();
        if (tasks.length) {
            const lists = this.loadStoredLists();
            if (lists.length) {
                this.storeTasks(cleanTasksWithoutList(lists, tasks));
            } else {
                this.deleteStoredTasks();
            }
        }
    }

    loadStoredLists = () =>
    {
        return this.storage.get(this.LISTS_KEY);
    }

    loadStoredTasks = () =>
    {
        return this.storage.get(this.TASKS_KEY);
    }

    storeTasks(tasks)
    {
        this.storage.set(this.TASKS_KEY, tasks);
    }

    updateStoredData(stateData)
    {
        let data    = stateData.data;
        let appMode = stateData.appMode;
        let selectedListId = stateData.selectedListId;

        if (data) {

            let storageKey = this.LISTS_KEY;
            if (appMode === 'tasks') {
                storageKey = this.TASKS_KEY;

                data = updateSelectedListTasks(
                    selectedListId, data, this.loadStoredTasks());
            }

            this.storage.set(storageKey, data);
        }
    }
}

export default AppStorage;
