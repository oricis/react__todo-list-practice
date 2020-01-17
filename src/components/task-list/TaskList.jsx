import './task-list.scss';
import React, { Component, Fragment } from 'react';
import Tasks from './tasks/Tasks';
import PropTypes from 'prop-types';
import Storage from '../../services/Storage.js';
import Form from './form/Form.jsx';
import Task from '../../classes/Task.js';

class TaskList extends Component
{
    constructor(props)
    {
        super(props);

        // Set default values
        this.defaultTaskColor = 'green';
        this.storage = new Storage();

        const data = this.storage.get('stored-tasks');
        const INITIAL = {
            newTaskText: '',
            tasks: data,
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
                <Form addTask={this.addTask}></Form>
                {tasks}
            </Fragment>
        );
    }

    componentDidUpdate()
    {
        this.updatedTasksStorage();
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

    markTaskAsCompleted(tasks, taskId)
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

    updatedTasksStorage()
    {
        this.storage.set('stored-tasks', this.state.tasks);
    }

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
