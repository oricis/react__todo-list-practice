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
            <section class="App-task-list">
                <article class="task-intro">
                    <label htmlFor="create-task">Introduce una tarea:</label>
                    <input type="text" id="create-task" />
                </article>

                <article class="task-list">
                    <div class="task">
                        <p class="task-title">Foo</p>
                        <div className="task-buttons">
                            <input type="button" class="btn btn-primary" value="Completada" />
                            <input type="button" class="btn btn-primary" value="Eliminar" />
                        </div>
                    </div>
                    <div class="task">
                        <p class="task-title">Lorem ipsum</p>
                        <div className="task-buttons">
                            <input type="button" class="btn btn-primary" value="Completada" />
                            <input type="button" class="btn btn-primary" value="Eliminar" />
                        </div>
                    </div>
                </article>
            </section>
        );
    }
}

export default TaskList;
