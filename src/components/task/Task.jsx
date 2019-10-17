
import './task.scss';
import ColorPicket from '../color-picket/ColorPicket';
import React, { Component } from 'react';

class Task extends Component
{

    render()
    {
        return (
            <div className="content-box task" data-id={this.props.dataId}>
                <ColorPicket bgColor={this.props.bgColor}></ColorPicket>

                <p className="task-title">{ this.props.text }</p>
                <div className="task-buttons">
                    <button className="btn btn-primary">
                        Completada
                    </button>
                    <button className="btn btn-primary"
                        onClick={() => { this.deleteTask(this.props.dataId); }}>
                        Eliminar
                    </button>
                </div>
            </div>
        );
    }

    deleteTask = (id) =>
    {
        console.log('Task / deleteTask() - ID: ' + id); // HACK:

        this.props.onDeleteTask(id);
    }
}

export default Task;
