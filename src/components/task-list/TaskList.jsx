import './task-list.css';
import React, { Component } from 'react';
import Tasks from '../tasks/Tasks';
import generateID from '../../helpers/generateID.js';

class TaskList extends Component
{
    constructor(props)
    {
        super(props);

        // Set default values
        this.state = {
            tasks: [
                {
                    text: 'Foo',
                    completed: false,
                    id: generateID(),
                },
                {
                    text: 'Lorem ipsum',
                    completed: true,
                    id: generateID(),
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
                    <input type="text" id="create-task" />
                </article>

                { (this.state.tasks.length > 0 )
                    ? <Tasks taskList={ this.state.tasks }></Tasks> : ''
                }
            </section>
        );
    }
}

export default TaskList;
