
import './tasks.css';
import React, { Component } from 'react';

class Tasks extends Component {
    constructor(props) {
        super(props);

        // Set default values
        this.state = {

        };
    }

    render() {
        return (
            <article className="task-list">
                <div className="content-box task">
                    <p className="task-title">Foo</p>
                    <div className="task-buttons">
                        <input type="button" className="btn btn-primary" value="Completada" />
                        <input type="button" className="btn btn-primary" value="Eliminar" />
                    </div>
                </div>
                <div className="content-box task">
                    <p className="task-title">Lorem ipsum</p>
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
