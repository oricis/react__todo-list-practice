
import './task.scss';
import ColorPicket from '../color-picket/ColorPicket';
import React, { Component } from 'react';

class Task extends Component
{

    constructor(props)
    {
        super(props);

        const cssClassesForCompleteBtn = (props.completed === true)
            ? 'btn btn-dafault'
            : 'btn btn-primary';

        this.state = {
            cssClassesForCompleteBtn: cssClassesForCompleteBtn
        }
    }

    render()
    {

        return (
            <div className="content-box task" data-id={this.props.dataId}>
                <ColorPicket bgColor={this.props.bgColor}></ColorPicket>

                <p className="task-title">
                    {
                        (this.props.completed === true)
                            ? <span className="strikethrough-text opacity50">this.props.text</span>
                            : this.props.text
                    }
                </p>
                <div className="task-buttons">
                    <button className={this.state.cssClassesForCompleteBtn}
                        disabled={this.props.completed}
                        onClick={() => { this.completeTask(this.props.dataId); }}>
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


    completeTask = (id) =>
    {
        this.props.onCompleteTask(id);
        this.setState({
            cssClassesForCompleteBtn: 'btn btn-dafault'
        });
    }

    deleteTask = (id) =>
    {
        this.props.onDeleteTask(id);
    }
}

export default Task;
