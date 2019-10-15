
import './task.css';
import React, { Component } from 'react';
import generateID from '../../helpers/generateID.js';

class Task extends Component
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
            <div className="content-box task" data-id={this.props.dataId }>
                <p className="task-title">{ this.props.text }</p>
                <div className="task-buttons">
                    <input type="button" className="btn btn-primary" value="Completada" />
                    <input type="button" className="btn btn-primary" value="Eliminar" />
                </div>
            </div>
        );
    }
}

export default Task;
