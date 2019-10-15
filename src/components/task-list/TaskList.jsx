import './task-list.css';
import React, { Component } from 'react';
import Tasks from '../tasks/Tasks';

class TaskList extends Component
{
    constructor(props)
    {
        super(props);

        // Set default values
        this.state = {

        };
    }

    render()
    {
        return (
            <section className="App-task-list">
                <article className="content-box task-intro">
                    <label htmlFor="create-task">Introduce una tarea:</label>
                    <input type="text" id="create-task" />
                </article>

                <Tasks></Tasks>
            </section>
        );
    }
}

export default TaskList;
