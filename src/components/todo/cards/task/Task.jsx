
import './task.scss';
import React, { Component } from 'react';
import CardBody from './card-body/CardBody';
import CardFooter from './card-footer/CardFooter';
import CardHeader from './card-header/CardHeader';

class Task extends Component
{
    state = {
        editable: false
    }

    render()
    {
        return (
            <div className="content-box task-card" data-id={this.props.dataId}>
                <CardHeader
                    bgColor={this.props.bgColor}
                    completed={this.props.completed}
                    setColorFromPicket={this.setColorFromPicket}
                    onClickToEdit={this.editTask}>
                </CardHeader>

                <CardBody
                    completed={this.props.completed}
                    editable={this.state.editable}
                    title={this.props.title}
                    updateTask={this.updateTask}>
                </CardBody>

                <CardFooter
                    completed={this.props.completed}
                    onClickToDelete={this.deleteTask}
                    onClickToComplete={this.completeTask}>
                </CardFooter>
            </div>
        );
    }


    ////////////////////////////////////////////////////////////////////
    // Actions

    completeTask = () =>
    {
        const id = this.props.dataId;

        this.props.onCompleteTask(id);
        this.setState({
            classNameForCompleteBtn: 'btn btn-default'
        });
    }

    deleteTask = () =>
    {
        const id = this.props.dataId;

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
