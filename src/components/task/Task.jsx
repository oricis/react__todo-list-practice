
import './task.scss';
import ColorPicket from '../color-picket/ColorPicket';
import React, { Component } from 'react';

class Task extends Component
{

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
