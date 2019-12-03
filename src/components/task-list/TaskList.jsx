import './task-list.scss';
import React, { Component } from 'react';
import Tasks from '../tasks/Tasks';
import PropTypes from 'prop-types';
import Storage from '../../services/Storage.js';
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
            <section className="App-task-list">
                <article className="content-box task-intro">
                    <input type="text"
                        id="create-task"
                        placeholder="Introduce una tarea..."
                        value={this.state.newTaskText}
                        onChange={event =>
                            this.setState({ newTaskText: event.target.value })
                        }
                        onKeyUp={this.addTask}/>

                    <button className="btn" onClick={this.addTaskFromInput}>
                        Añadir
                    </button>
                    <button className="btn" onClick={this.cleanTaskInput}>
                        Limpiar
                    </button>
                </article>

                {tasks}
            </section>
        );
    }

    componentDidUpdate()
    {
        this.updatedTasksStorage();
    }


    /**
     * Custom methods
     *
     */

    addTask = (event) =>
    {
        if (event.key === 'Enter') {
            const text     = event.target.value.trim();
            this.addTaskToState(text);
        }
    }

    addTaskFromInput = () =>
    {
        const text = document.getElementById('create-task').value.trim();
        this.addTaskToState(text);
    }

    addTaskToState = (text) =>
    {
        const newTask = this.createTask(text, this.defaultTaskColor);
        const arrTasks = [...this.state.tasks, newTask];

        this.setState({
            newTaskText: '',
            tasks: arrTasks
        });
    }

    cleanTaskInput = () =>
    {
        this.setState({
            newTaskText: ''
        });
    }

    createTask = (text: PropTypes.string, color: PropTypes.string) =>
    {
        let tasksLength = this.state.tasks.length;
        const taskText = text || 'Task ' + ++tasksLength;

        return new Task(taskText, color);
    }

    completeTask = (id: PropTypes.string) =>
    {
        const arrTasks = this.markTaskAsCompleted(this.state.tasks, id);
        this.setState({
            tasks: arrTasks
        });
    }

    deleteTask = (id: PropTypes.string) =>
    {
        const arrTasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({
            tasks: arrTasks
        });
    }

    markTaskAsCompleted(tasks: PropTypes.array, taskId: PropTypes.string)
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

    updatedTasksStorage()
    {
        this.storage.set('stored-tasks', this.state.tasks);
    }

    updateTask = (id, text) =>
    {
        console.log('updating task ID: ' + id, text)
    }
}

export default TaskList;
