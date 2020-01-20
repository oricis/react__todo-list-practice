
import './task.scss';
import ColorPicket from '../../../common/color-picket/ColorPicket';
import React, { Component } from 'react';
import editIcon from '../../../../assets/images/edit-regular.svg';
import ImageButton from '../../../common/image-button';
import TaskText from './task-text/TaskText.jsx';

class Task extends Component
{
    state = {
        editable: false
    }


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
        const editButton = <ImageButton
            className="image-btn"
            image={editIcon}
            attraAlt="Editar"
            attrtTitle="Editar"
            onClick={this.editTask}></ImageButton>;

        return (
            <div className="content-box task" data-id={this.props.dataId}>
                <div className="actions">
                    {
                        (this.props.completed)
                            ? ''
                            : editButton
                    }

                    <ColorPicket
                        bgColor={this.props.bgColor}
                        completed={this.props.completed}
                        setColorFromPicket={this.setColorFromPicket}>
                    </ColorPicket>
                </div>

                <TaskText
                    completed={this.props.completed}
                    editable={this.state.editable}
                    text={this.props.text}
                    updateTask={this.updateTask}>
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
        this.setState({
            editable: true
        })
    }

    setColorFromPicket = (color) =>
    {
        this.props.setColorFromPicket(color, this.props.dataId);
    }

    updateTask = (text) =>
    {
        if (text !== this.props.text) {
            const taskId = this.props.dataId;
            this.props.updateTask(taskId, text);
        }

        this.setState({
            editable: false
        })
    }
}

export default Task;
