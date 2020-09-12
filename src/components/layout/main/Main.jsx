import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../services/Storage.js';
import {
    getTasksOfList,
    getSelected,
    isSomeSelected,
    selectFirst,
    getUpdatedTasksToStore
} from '../../../helpers/todo.js';
import List from '../../../classes/List.js';
import Task from '../../../classes/Task.js';

import Cards from './cards/Cards';
import ListForm from '../../forms/ListForm';
import TaskForm from '../../forms/TaskForm';

class Main extends Component
{
    // Default values
    defaultTaskColor = 'green';
    storedTasks = [];


    constructor(props)
    {
        super(props);

        this.storage = new Storage();
        this.state   = this.init();
    }

    render()
    {
        console.log('render()', this.state) //HACK:
        let data = this.state.data;

        // NOTE: always one list is selected - the first by default
        if (this.state.appMode === 'lists') {
            data = this.checkToSelectFirstList(data);
        }

        const form = (this.state.appMode === 'tasks')
            ? <TaskForm
                addTask={this.addTask}
                onClickSwapButton={this.clickedSwapButton}>
            </TaskForm>
            : <ListForm
                listNumber={data.length}
                addList={this.addList}
                onClickSwapButton={this.clickedSwapButton}>
            </ListForm>;

        const tasksOrLists = (data.length)
            ? <Cards
                data={data}
                mode={this.state.appMode}
                setColorFromPicket={this.setColorFromPicket}
                onClickToCompleteTask={(id) => { this.completeTask(id); }}
                onClickToDeleteCard={(id) => { this.deleteCard(id); }}
                onClickToSelect={(id) => { this.selectList(id); }}
                updateCard={this.updateCard}>
            </Cards>
            : '';

        return (
            <main className="App-Todo">
                {form}
                {tasksOrLists}
            </main>
        );
    }

    componentDidUpdate()
    {
        this.updateStoredData();
    }


    checkToSelectFirstList = (data) =>
    {
        return (data.length && !isSomeSelected(data))
            ? selectFirst(data)
            : data;
    }

    getSelectedListId = (appMode, data) =>
    {
        let result = '';

        if (appMode === 'tasks') {
            data = this.loadStoredData('lists');
            if (data.length) {
                result = getSelected(data).id;
            }

        } else {
            if (data.length) {
                result = (data.length > 1)
                    ? getSelected(data).id
                    : data[0].id;
            }
        }

        return result;
    }

    init = () => {
        let appMode = 'tasks'; // tasks | lists (two app's modes -> views)
        let selectedListId = '';

        let data = this.loadStoredData(appMode);
        if (data.length) {
            selectedListId = this.getSelectedListId(appMode, data);

        } else {
            appMode = 'lists';
            data = this.loadStoredData(appMode);
            selectedListId = this.getSelectedListId(appMode, data);
        }

        return {
            appMode: appMode,
            data: data,
            newText: '',
            selectedListId: selectedListId,
        };
    }


    /**
     * Custom methods
     * Swap App mode - Tasks of the list / lists of tasks
     *
     */

    clickedSwapButton = () =>
    {
        console.log('clickedSwapButton() - OLD mode: ' + this.state.appMode)

        const newAppMode = (this.state.appMode === 'tasks')
            ? 'lists'
            : 'tasks';
        const data = this.loadStoredData(newAppMode);
        console.log('clickedSwapButton() - NEW mode: ' + newAppMode)
        this.setState({
            appMode : newAppMode,
            data    : data,
        });
    }


    /**
     * Custom methods
     * Create a new task / list
     *
     */

    addList = (text, description) =>
    {
        const newList  = this.createList(text, description);
        const arrLists = [...this.state.data, newList];

        this.addDataToState(arrLists);
    }

    addTask = (text) =>
    {
        const newTask  = this.createTask(text, this.defaultTaskColor);
        const arrTasks = [...this.state.data, newTask];

        this.addDataToState(arrTasks);
    }

    createList = (title, description) =>
    {
        let dataLength = this.state.data.length;
        const text = title || 'List ' + ++dataLength;

        return new List(text, description);
    }

    createTask = (title, color) =>
    {
        let dataLength = this.state.data.length;
        const text = title || 'Task ' + ++dataLength;
        const listId = this.state.selectedListId

        return new Task(text, color, listId);
    }

    /**
     * Custom methods
     * Card actions
     *
     */

    completeTask = (id) =>
    {
        const arrTasks = this.markTaskAsCompleted(this.state.data, id);
        this.setState({
            data: arrTasks
        });
    }

    deleteCard = (id) =>
    {
        const arrTasks = this.state.data.filter(task => task.id !== id);
        this.setState({
            data: arrTasks
        });
    }

    markTaskAsCompleted = (tasks, taskId) =>
    {
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.completed = true;
            }
        });

        return tasks;
    }

    selectList = (id) =>
    {
        const tempData = this.state.data;
        tempData.forEach(list => {
            list.selected = false;
            if (list.id === id) {
                list.selected = true;
            }
        });

        this.setState({
            data          : tempData,
            selectedListId: id,
        })
    }

    setColorFromPicket = (color, taskId) =>
    {
        const arrTasks = this.state.data;
        arrTasks.forEach(task => {
            if (task.id === taskId) {
                task.color = color;
            }
        });

        this.setState({
            data: arrTasks
        });
    }

    /**
     * Custom methods
     * Actions over store data
     *
     */

    /**
     * Load the stored app data
     *
     * @param string appMode -> lists | tasks
     * @return array         -> stored-lists | stored-tasks
     */
    loadStoredData(appMode)
    {
        console.log('loadStoredData() - appMode: ' + appMode+' || state:', this.state)
        const storageKey = (appMode === 'lists')
            ? 'stored-lists'
            : 'stored-tasks';

        if (storageKey === 'stored-lists') {
            return this.storage.get(storageKey);
        }

        const tasks = this.storage.get(storageKey);
        console.log('loadStoredData () - tareas:', tasks); // HACK

        this.storedTasks = tasks;
        return (tasks.length && this.state)

            // return only tasks with the selected list ID
            ? getTasksOfList(tasks, this.state.selectedListId)

            // return all the task
            : tasks; // []
    }

    updateStoredData()
    {
        if (this.state.data) {
            const appMode    = this.state.appMode;
            const storageKey = (appMode === 'lists')
                ? 'stored-lists'
                : 'stored-tasks';

            let livedDataToStore = this.state.data; // lists || tasks
            if (appMode === 'tasks') {
                livedDataToStore = getUpdatedTasksToStore(livedDataToStore, this.storedTasks);
            }

            this.storage.set(storageKey, livedDataToStore);
        }
    }


    /**
     * Custom methods
     * Generic
     *
     */
    addDataToState = (data) =>
    {
        this.setState({
            data          : data,
            newText       : '',
            selectedListId: (this.state.selectedListId === '')
                ? this.getSelectedListId(this.state.appMode, data)
                : this.state.selectedListId
        });
    }

    updateCard = (taskId, text) =>
    {
        const arrTasks = this.state.data;
        arrTasks.forEach(task => {
            if (task.id === taskId) {
                task.text = text;
            }
        });

        this.setState({
            data: arrTasks
        });
    }
}

// Setting the proptypes of the component
Main.propTypes = {
    color:  PropTypes.string,
    id:     PropTypes.string,
    taskId: PropTypes.string,
    data:   PropTypes.array,
    text:   PropTypes.string,
    title:  PropTypes.string,
    description: PropTypes.string
};

export default Main;
