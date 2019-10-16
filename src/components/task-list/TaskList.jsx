import './task-list.scss';
import React, { Component } from 'react';
import Tasks from '../tasks/Tasks';
import PropTypes from 'prop-types';
import Task from '../../classes/Task.js';


class TaskList extends Component
{
    constructor(props)
    {
        super(props);

        // Set default values
        this.defaultTaskColor = 'green';
        this.state = {
            tasks: [
                {
                    text: 'Foo',
                    completed: false,
                    color: 'green',
                    id: 'as3434as',
                },
                {
                    text: 'Lorem ipsum',
                    completed: true,
                    color: 'tomato',
                    id: 'ccjm23er',
                },
            ],
        };
    }

    render()
    {
        return (
            <section className="App-task-list">
                <article className="content-box task-intro">
                    <label htmlFor="create-task">Introduce una tarea:</label>
                    <input type="text" id="create-task" onKeyUp={this.addTask} />
                </article>

                { (this.state.tasks.length > 0 )
                    ? <Tasks taskList={ this.state.tasks }></Tasks> : ''
                }
            </section>
        );
    }

    componentDidMount()
    {
        console.log('componentes inicio: ' + this.state.tasks.length); // HACK:
    }
    componentDidUpdate()
    {
        console.log('tareas: ' + this.state.tasks.length); // HACK:
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
            const arrTasks = [... this.state.tasks, newTask];

            this.setState({
                tasks: arrTasks
            });
        }
    }

    createTask = (
        text: PropTypes.string,
        color: PropTypes.string
    ) => {
        let tasksLength = this.state.tasks.length;
        const taskText = text || 'Task ' + ++tasksLength;

        return new Task(taskText, color);
    }
}

export default TaskList;
