
import './task.scss';
import ColorPicket from '../color-picket/ColorPicket';
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
                <ColorPicket bgColor={this.props.bgColor}></ColorPicket>

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
