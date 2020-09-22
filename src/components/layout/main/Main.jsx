import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../services/Storage.js';
import {
    cleanTasksWithoutList,
    find,
    getSelected,
    getTasksOfList,
    getUpdatedTasksToStore,
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

        // NOTE: always one list is selected - the first one by default
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


    getSelectedListId = (arrLists) =>
    {
        let result = this.state
            ? this.state.selectedListId
            : '';

        if (arrLists.length) {
            result = (arrLists.length > 1)
                ? getSelected(arrLists).id
                : arrLists[0].id;
        }

        return result;
    }

    getSelectedListText = (listId) =>
    {
        const lists = this.loadStoredLists();
        const list  = find(lists, listId);

        return (list)
            ? list.text
            : '';
    }

    init = () =>
    {
        const listsFromStorage = this.loadStoredLists();
        const tasksFromStorage = this.loadStoredTasks();

        let appMode = 'tasks'; // tasks | lists (two app's modes -> views)
        let data    = [];
        let selectedListId = '';
        let selectedListText = '';

        // There are stored tasks or lists or both
        if (listsFromStorage.length || tasksFromStorage.length) {
            console.log(111, listsFromStorage.length, tasksFromStorage.length);
            if (tasksFromStorage.length) {
                console.log(222);
                selectedListId = this.getSelectedListId(listsFromStorage);
                selectedListText = this.getSelectedListText(selectedListId);

                const selectedListTasks = getTasksOfList(tasksFromStorage, selectedListId);
                if (selectedListTasks.length) {
                    console.log(2221);
                    data = selectedListTasks;
                }

            } else {

                console.log(333);
                if (listsFromStorage.length) {
                    console.log(3331);
                    const selectedList = getSelected(listsFromStorage);
                    selectedListId = selectedList.id;
                    selectedListText = selectedList.text;

                } else {
                    console.log(3332);
                    appMode = 'lists'
                }
            }


        // There aren't stored any tasks or lists
        } else {
            console.log(666);
            appMode = 'lists'
        }

        const stateData = {
            appMode : appMode, // tasks || lists
            data    : data,    // tasks || lists
            newText : '',
            selectedListId: selectedListId,
            selectedListText: selectedListText,
        };

        return stateData;
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
        const arrLists = [...this.state.data, newList];

        this.setState({
            data: arrLists,
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

    loadStoredLists = () =>
    {
        const storageKey = 'stored-lists';

        return this.storage.get(storageKey);
    }

    loadStoredTasks = () => {
        const storageKey = 'stored-tasks';

        return this.storage.get(storageKey);
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

// Setting the proptypes of the component
Main.propTypes = {
    color:  PropTypes.string,
    id:     PropTypes.string,
    listId: PropTypes.string,
    taskId: PropTypes.string,
    data:   PropTypes.array,
    text:   PropTypes.string,
    title:  PropTypes.string,
    description: PropTypes.string
};

export default Main;
