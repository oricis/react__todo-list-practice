import './task-list.css';
import React, { Component } from 'react';

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
                <article className="task-intro">
                    <label htmlFor="create-task">Introduce una tarea:</label>
                    <input type="text" id="create-task" />
                </article>

                <article className="task-list">
                    <div className="task">
                        <p className="task-title">Foo</p>
                        <div className="task-buttons">
                            <input type="button" className="btn btn-primary" value="Completada" />
                            <input type="button" className="btn btn-primary" value="Eliminar" />
                        </div>
                    </div>
                    <div className="task">
                        <p className="task-title">Lorem ipsum</p>
                        <div className="task-buttons">
                            <input type="button" className="btn btn-primary" value="Completada" />
                            <input type="button" className="btn btn-primary" value="Eliminar" />
                        </div>
                    </div>
                </article>
            </section>
        );
    }
}

export default TaskList;
