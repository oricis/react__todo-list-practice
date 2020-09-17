import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../services/Storage.js';
import {
    find,
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
        console.log('HACK: render()', this.state);
        let cards = this.state.data;

        // NOTE: always one list is selected - the first by default
        if (this.state.appMode === 'lists'
            && cards.length && typeof (cards) === 'object') {
            if (!isSomeSelected(cards)) {
                cards = selectFirst(cards);
            }
        }

        const form = (this.state.appMode === 'tasks')
            ? <TaskForm
                selectedListText={this.state.selectedListText}
                addTask={this.addTask}
                onClickSwapButton={this.clickedSwapButton}>
            </TaskForm>
            : <ListForm
                listNumber={cards.length}
                addList={this.addList}
                onClickSwapButton={this.clickedSwapButton}>
            </ListForm>;


        const tasksOrLists = (cards.length && typeof (cards) === 'object')
            ? <Cards
                data={cards}
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

    getSelectedListText = (listId) =>
    {
        const lists = this.loadStoredData('lists');
        const list  = find(lists, listId);

        return (list)
            ? list.text
            : '';
    }

    init = () =>
    {
        let appMode = 'tasks'; // tasks | lists (two app's modes -> views)
        let selectedListId = '';

        let data = this.loadStoredData(appMode);
        if (data.length) {
            selectedListId = this.getSelectedListId(appMode, data);

        } else {
            appMode = 'lists';
            data    = this.loadStoredData(appMode);
            selectedListId = this.getSelectedListId(appMode, data);
        }

        const selectedListText = (selectedListId)
            ? this.getSelectedListText(selectedListId)
            : '';

        return {
            appMode : appMode, // tasks || lists
            data    : data,    // tasks || lists
            newText : '',
            selectedListId: selectedListId,
            selectedListText: selectedListText,
        };
    }


    /**
     * Custom methods
     * Swap App mode - Tasks of the list / lists of tasks
     *
     */

    clickedSwapButton = () =>
    {
        const newAppMode = (this.state.appMode === 'tasks')
            ? 'lists'
            : 'tasks';
        const data = this.loadStoredData(newAppMode);

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
        const text     = title || 'List ' + ++dataLength;

        return new List(text, description);
    }

    createTask = (title, color) =>
    {
        let dataLength = this.state.data.length;
        const text     = title || 'Task ' + ++dataLength;
        const listId   = this.state.selectedListId

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
        let arrCards = this.state.data.filter(card => card.id !== id);
        let selectedListId   = this.state.selectedListId;
        let selectedListText = this.state.selectedListText;

        if (this.state.appMode === 'lists' && id === selectedListId) {
            arrCards = selectFirst(arrCards);
            selectedListId   = arrCards[0].id;
            selectedListText = arrCards[0].text;
        }

        this.setState({
            data: arrCards,
            selectedListId,
            selectedListText
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
        let selectedListText = '';
        const tempData = this.state.data;
        tempData.forEach(list => {
            list.selected = false;
            if (list.id === id) {
                list.selected = true;
                selectedListText = list.text;
            }
        });

        this.setState({
            data          : tempData,
            selectedListId: id,
            selectedListText: selectedListText,
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
    loadStoredData = (appMode) =>
    {
        const storageKey = (appMode === 'lists')
            ? 'stored-lists'
            : 'stored-tasks';

        if (storageKey === 'stored-lists') {
            return this.storage.get(storageKey);
        }

        let allTasks = this.storage.get(storageKey);
        this.storedTasks = allTasks;

        // return the tasks with the selected list ID
        return (allTasks.length && this.state)
            ? getTasksOfList(allTasks, this.state.selectedListId)
            : [];
    }

    updateStoredData()
    {
        let dataToStore = this.state.data; // lists || tasks
        if (dataToStore) {

            let storageKey = 'stored-lists';
            if (this.state.appMode === 'tasks') {
                storageKey  = 'stored-tasks';

                const listId = this.state.selectedListId;
                dataToStore  = getUpdatedTasksToStore(
                    listId, dataToStore, this.storedTasks);
            }

            this.storage.set(storageKey, dataToStore);
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

export default Main; // 362
