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
        this.defaultTaskColor = 'rgb(6, 187, 6)';
        this.storage = new Storage();

        const INITIAL = {
            newTaskText: '',
            tasks: [],
        };

        const data = this.storage.get('stored-tasks');
        if (data) {
            INITIAL.tasks = data;
        }

        this.state = INITIAL;
    }

    render()
    {

        return (
            <section className="App-task-list">
                <article className="content-box task-intro">
                    <label htmlFor="create-task">Introduce una tarea:</label>
                    <input type="text"
                        id="create-task"
                        value={this.state.newTaskText}
                        onChange={event =>
                            this.setState({ newTaskText: event.target.value })
                        }
                        onKeyUp={this.addTask}/>

                    <button className="btn" onClick={this.cleanTaskInput}>
                        Clean
                    </button>
                </article>

                {
                    (this.state.tasks.length > 0)
                        ? <Tasks taskList={this.state.tasks}
                            onCompleteTask={(id) => { this.completeTask(id); }}
                            onDeleteTask={(id) => { this.deleteTask(id); }}></Tasks>
                        : ''
                }
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
            // const text  = document.getElementById('create-task').value.trim();
            const text     = event.target.value.trim();
            const newTask  = this.createTask(text, this.defaultTaskColor);
            const arrTasks = [...this.state.tasks, newTask];

            this.setState({
                newTaskText: '',
                tasks: arrTasks
            });
        }
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

    updatedTasksStorage()
    {
        this.storage.set('stored-tasks', this.state.tasks);
    }
}

export default TaskList;
