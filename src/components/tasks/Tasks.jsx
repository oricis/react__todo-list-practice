
import './tasks.css';
import React, { Component } from 'react';
import generateID from '../../helpers/generateID.js';

class Tasks extends Component
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
            <article className="task-list">
                <div className="content-box task" data-id={ this.state.tasks[0].id }>
                    <p className="task-title">{ this.state.tasks[0].text }</p>
                    <div className="task-buttons">
                        <input type="button" className="btn btn-primary" value="Completada" />
                        <input type="button" className="btn btn-primary" value="Eliminar" />
                    </div>
                </div>
                <div className="content-box task" data-id="{ this.state.tasks[1].id }">
                    <p className="task-title">{ this.state.tasks[1].text }</p>
                    <div className="task-buttons">
                        <input type="button" className="btn btn-primary" value="Completada" />
                        <input type="button" className="btn btn-primary" value="Eliminar" />
                    </div>
                </div>
            </article>
        );
    }
}

export default Tasks;
