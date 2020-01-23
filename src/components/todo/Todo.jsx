import './styles.scss';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../services/Storage.js';
import List from '../../classes/List.js';
import Task from '../../classes/Task.js';

import Cards from './cards/Cards';
import ListForm from '../forms/list-form/ListForm';
import TaskForm from '../forms/task-form/TaskForm';

class Todo extends Component
{
    // Default values
    defaultTaskColor = 'green';


    constructor(props)
    {
        super(props);

        this.storage = new Storage();

        const storedMode = this.storage.get('stored-list');
        const appMode = (storedMode)
            ? storedMode
            : 'tasks'; // tasks | lists
        const data = this.loadStoredData(appMode);

        const INITIAL = {
            appMode   : appMode,
            newText   : '',
            data      : data,
        };

        this.state = INITIAL;
    }

    render()
    {
        const form = (this.state.appMode === 'tasks')
            ? <TaskForm
                addTask={this.addTask}
                onClickSwapButton={this.clickedSwapButton}>
            </TaskForm>
            : <ListForm
                addList={this.addList}
                onClickSwapButton={this.clickedSwapButton}>
            </ListForm>

        const tasksOrLists = (this.state.data.length > 0)
            ? <Cards
                data={this.state.data}
                mode={this.state.appMode}
                setColorFromPicket={this.setColorFromPicket}
                onClickToCompleteTask={(id) => { this.completeTask(id); }}
                onClickToDeleteCard={(id) => { this.deleteCard(id); }}
                onClickToSelectList={(id) => { this.selectList(id); }}
                updateCard={this.updateCard}>
            </Cards>
            : '';

        return (
            <Fragment>
                {form}
                {tasksOrLists}
            </Fragment>
        );
    }

    componentDidUpdate()
    {
        this.updateStoredData();
    }


    /**
     * Custom methods
     * Swap App mode - Tasks of the list / lists of tasks
     *
     */

    clickedSwapButton = () => {
        console.log('clickedSwapButton() - mode: ' + this.state.appMode)

        const newAppMode = (this.state.appMode === 'tasks')
            ? 'lists'
            : 'tasks';

        this.setState({
            appMode: newAppMode
        });
    }


    /**
     * Custom methods
     * Create a new task / list
     *
     */

    addList = (text, description) =>
    {
        console.log('Todo / addList() -> ' +text+' === '+description); // HACK:
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

        return new Task(text, color);
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

    selectList = (id) => {
        console.log('Todo / selectList() - ID: ' + id + ' was clicked !!!');
        // TODO:
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

    loadStoredData(appMode)
    {
        return (appMode === 'tasks' // tasks | lists
            || !this.storage.get('stored-lists'))

            ? this.storage.get('stored-tasks')
            : this.storage.get('stored-lists');
    }

    updateStoredData()
    {
        const storageKey = (this.state.appMode === 'lists')
            ? 'stored-lists'
            : 'stored-tasks';
        this.storage.set(storageKey, this.state.data);
    }


    /**
     * Custom methods
     * Generic
     *
     */
    addDataToState = (data) =>
    {
        this.setState({
            newText: '',
            data: data
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
Todo.propTypes = {
    color:  PropTypes.string,
    id:     PropTypes.string,
    taskId: PropTypes.string,
    data:   PropTypes.array,
    text:   PropTypes.string
};

export default Todo;
