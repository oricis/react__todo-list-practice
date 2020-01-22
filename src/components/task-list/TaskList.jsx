import './task-list.scss';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Storage from '../../services/Storage.js';
import Form from './form/Form.jsx';
import Task from '../../classes/Task.js';
import Tasks from './tasks/Tasks';

class TaskList extends Component
{

    constructor(props)
    {
        super(props);

        // Set default values
        this.defaultTaskColor = 'green';
        this.storage = new Storage();

        const storedMode = this.storage.get('todo-list-mode');
        const appMode = (storedMode)
            ? storedMode
            : 'tasks'; // tasks | lists
        const data = this.loadStoredData(appMode);

        const INITIAL = {
            appMode  : appMode,
            newTaskText : '',
            tasks       : data,
        };

        this.state = INITIAL;
    }

    render()
    {
        const tasks = (this.state.tasks.length > 0)
            ? <Tasks
                taskList={this.state.tasks}
                setColorFromPicket={this.setColorFromPicket}
                onCompleteTask={(id) => { this.completeTask(id); }}
                onDeleteTask={(id) => { this.deleteTask(id); }}
                updateTask={this.updateTask}>
            </Tasks>
            : '';

        return (
            <Fragment>
                <Form
                    addTask={this.addTask}
                    onClickSwapButton={this.clickedSwapButton}>
                </Form>

                {tasks}
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
     * Create new tasks
     *
     */

    addTask = (text) => {
        const newTask = this.createTask(text, this.defaultTaskColor);
        const arrTasks = [...this.state.tasks, newTask];

        this.setState({
            newTaskText: '',
            tasks: arrTasks
        });
    }

    createTask = (text, color) => {
        let tasksLength = this.state.tasks.length;
        const taskText = text || 'Task ' + ++tasksLength;

        return new Task(taskText, color);
    }


    /**
     * Custom methods
     * Task card actions
     *
     */

    completeTask = (id) =>
    {
        const arrTasks = this.markTaskAsCompleted(this.state.tasks, id);
        this.setState({
            tasks: arrTasks
        });
    }

    deleteTask = (id) =>
    {
        const arrTasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({
            tasks: arrTasks
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

    setColorFromPicket = (color, taskId) =>
    {
        const arrTasks = this.state.tasks;
        arrTasks.forEach(task => {
            if (task.id === taskId) {
                task.color = color;
            }
        });

        this.setState({
            tasks: arrTasks
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
        this.storage.set(storageKey, this.state.tasks);
    }


    /**
     * Custom methods
     * Generic
     *
     */

    updateTask = (taskId, text) =>
    {
        const arrTasks = this.state.tasks;
        arrTasks.forEach(task => {
            if (task.id === taskId) {
                task.text = text;
            }
        });

        this.setState({
            tasks: arrTasks
        });
    }
}

// Setting the proptypes of the component
TaskList.propTypes = {
    color:  PropTypes.string,
    id:     PropTypes.string,
    taskId: PropTypes.string,
    tasks:  PropTypes.array,
    text:   PropTypes.string
};

export default TaskList;
