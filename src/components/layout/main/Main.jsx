import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../services/Storage.js';
import {
    getSelectedListText,
} from '../../../helpers/lists.js';
import {
    cleanTasksWithoutList,
    getSelected,
    getTasksOfList,
    updateSelectedListTasks,
    isSomeSelected,
    markCardAsCompleted,
    selectCardColor,
    selectFirst,
    setCardText,
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


    getSelectedListId = (arrLists) =>
    {
        let selectedListId = this.state ? this.state.selectedListId : '';

        if (selectedListId === '') {
            const lists = (arrLists && arrLists.length)
                ? arrLists
                : this.loadStoredLists();

            if (lists.length) {
                selectedListId = getSelected(lists).id;
            }
        }
    }

    init = () =>
    {
        this.deleteStoredOrphanTasks(); // NOTE: put this first on init()

        const storedLists = this.loadStoredLists();
        const storedTasks = this.loadStoredTasks();
        console.log('Stored lists: ' + storedLists.length); // HACK:
        console.log('Stored tasks: ' + storedTasks.length); // HACK:

        let appMode = 'tasks'; // tasks | lists (two app's modes -> views)
        let data    = [];
        let selectedListId = '';
        let selectedListText = '';

        if (storedLists.length) {
            const selectedList = getSelected(storedLists);
            selectedListId     = selectedList.id;
            selectedListText   = selectedList.text;

            data = getTasksOfList(storedTasks, selectedListId); // [] | [...]

        } else {
            appMode = 'lists'; // There aren't any stored lists
        }


        return {
            appMode : appMode, // tasks || lists
            data    : data,    // tasks || lists
            newText : '',
            selectedListId : selectedListId,
            selectedListText : selectedListText,
        };;
    }


    /**
     * Custom methods
     * Swap App mode - Tasks of the list / lists of tasks
     *
     */

    clickedSwapButton = () =>
    {
        let appMode    = 'lists';
        let loadedData = [];

        if (this.state.appMode === 'lists') {
            appMode = 'tasks';

            loadedData = this.loadStoredTasks(); // all tasks
            loadedData = getTasksOfList(loadedData, this.state.selectedListId);

        } else {
            loadedData = this.loadStoredLists();
        }

        const data = loadedData;

        this.setState({
            appMode,
            data,
        });
    }


    /**
     * Custom methods
     * Create cards
     *
     */

    addList = (text, description) =>
    {
        const newList = this.createList(text, description);
        const selectedListId = (this.state.selectedListId)
            ? this.state.selectedListId
            : newList.id;
        const selectedListText = (this.state.selectedListText)
            ? this.state.selectedListText
            : newList.text;

        // NOTE: always one list is selected - the first one by default
        if (this.state.selectedListId === '') {
            newList.selected = true;
        }

        this.setState({
            data: [...this.state.data, newList],
            newText: '',
            selectedListId,
            selectedListText
        });
    }

    addTask = (text) =>
    {
        const newTask  = this.createTask(text, this.defaultTaskColor);
        const arrTasks = [...this.state.data, newTask];

        this.setState({
            data    : arrTasks,
            newText : ''
        });
    }

    createList = (title, description) =>
    {
        let dataLength = this.state.data.length;
        const text     = title || '';

        return new List(text, description);
    }

    createTask = (title, color) =>
    {
        let dataLength = this.state.data.length;
        const text     = title || '';
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
        this.setState({
            data: markCardAsCompleted(this.state.data, id)
        });
    }

    deleteCard = (id) =>
    {
        let arrCards = this.state.data.filter(card => card.id !== id);
        let selectedListId   = this.state.selectedListId;
        let selectedListText = this.state.selectedListText;

        if (this.state.appMode === 'lists') {
            selectedListId   = '';
            selectedListText = '';
            if (arrCards.length > 0) {
                if (!isSomeSelected(arrCards)) {
                    arrCards = selectFirst(arrCards);
                }

                const selectedList = getSelected(arrCards);
                selectedListId   = selectedList.id;
                selectedListText = selectedList.text;
            }
        }

        this.setState({
            data: arrCards,
            selectedListId,
            selectedListText
        });
    }

    selectList = (id) =>
    {
        let selectedListText = '';
        const lists = this.state.data;
        lists.forEach(list => {
            list.selected = false;
            if (list.id === id) {
                list.selected = true;
                selectedListText = list.text;
            }
        });

        this.setState({
            data          : lists,
            selectedListId: id,
            selectedListText: selectedListText,
        })
    }

    setColorFromPicket = (color, taskId) =>
    {
        this.setState({
            data: selectCardColor(this.state.data, taskId, color)
        });
    }

    /**
     * Custom methods
     * Actions over store data
     *
     */

    deleteStoredTasks = () =>
    {
        this.storeTasks([]);
    }

    deleteStoredOrphanTasks = () => {
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
        return this.storage.get('stored-lists');
    }

    loadStoredTasks = () =>
    {
        return this.storage.get('stored-tasks');
    }

    storeTasks(tasks)
    {
        this.storage.set('stored-tasks', tasks);
    }

    updateStoredData()
    {
        let dataToStore = this.state.data; // lists || tasks
        if (dataToStore) {

            let storageKey = 'stored-lists';
            if (this.state.appMode === 'tasks') {
                storageKey  = 'stored-tasks';

                const listId = this.state.selectedListId;
                dataToStore  = updateSelectedListTasks(
                    listId, dataToStore, this.loadStoredTasks());
            }

            this.storage.set(storageKey, dataToStore);
        }
    }

    /**
     * Custom methods
     * Generic
     *
     */

    getTasksOnLists = (allTasks) =>
    {
        const storedList   = this.loadStoredLists();
        const tasksOnLists = cleanTasksWithoutList(storedList, allTasks);

        return tasksOnLists;
    }

    updateCard = (taskId, text) =>
    {
        const selectedListText = this.appMode === 'tasks'
            ? this.state.selectedListText
            : text;

        this.setState({
            data: setCardText(this.state.data, taskId, text),
            selectedListText
        });
    }
}

// Setting the propTypes of the component
Main.propTypes = {
    color           : PropTypes.string,
    data            : PropTypes.array,
    description     : PropTypes.string,
    id              : PropTypes.string,
    listId          : PropTypes.string,
    selectedListId  : PropTypes.string,
    selectedListText: PropTypes.string,
    storedLists     : PropTypes.array,
    storedTasks     : PropTypes.array,
    taskId          : PropTypes.string,
    text            : PropTypes.string,
    title           : PropTypes.string,
};

export default Main;
