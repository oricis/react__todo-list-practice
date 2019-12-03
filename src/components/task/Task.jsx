
import './task.scss';
import ColorPicket from '../color-picket/ColorPicket';
import React, { Component } from 'react';
import editIcon from '../../assets/images/edit-regular.svg';
import TaskText from './task-text/TaskText.jsx';

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
                <div className="actions">
                    {
                        (this.props.completed)
                            ? ''
                            : <div className="image-btn" onClick={this.editTask}>
                                <img src={editIcon} alt="Editar" title="Editar" />
                            </div>
                    }

                    <ColorPicket
                        bgColor={this.props.bgColor}
                        setColorFromPicket={this.setColorFromPicket}>
                    </ColorPicket>
                </div>

                <TaskText
                    completed={this.props.completed}
                    editable={this.state.editable}
                    text={this.props.text}>
                </TaskText>

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

    ////////////////////////////////////////////////////////////////////
    // Actions

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

    editTask = () =>
    {
        const id = this.props.dataId;
        console.log('Task / editTask() - ID: ' + id);
    }

    setColorFromPicket = (color) =>
    {
        this.props.setColorFromPicket(color, this.props.dataId);
    }
}

export default Task;
