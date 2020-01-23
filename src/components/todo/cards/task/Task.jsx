
import './task.scss';
import React, { Component } from 'react';
import CardBody from './card-body/CardBody';
import CardHeader from './card-header/CardHeader';

class Task extends Component
{
    state = {
        editable: false
    }


    constructor(props) {
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
            <div className="content-box task-card" data-id={this.props.dataId}>
                <div className="card-header">
                    <CardHeader
                        bgColor={this.props.bgColor}
                        completed={this.props.completed}
                        setColorFromPicket={this.setColorFromPicket}
                        onClickToEdit={this.editTask}>
                    </CardHeader>
                </div>

                <div className="card-body">
                    <CardBody
                        completed={this.props.completed}
                        editable={this.state.editable}
                        title={this.props.title}
                        updateTask={this.updateTask}>
                    </CardBody>
                </div>

                <div className="card-footer">
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
