
import './styles.scss';
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
            <div className="card task-card" data-id={this.props.dataId}>
                <CardHeader
                    bgColor={this.props.bgColor}
                    completed={this.props.completed}
                    setColorFromPicket={this.setColorFromPicket}
                    onClickToEdit={this.editCard}>
                </CardHeader>

                <CardBody
                    completed={this.props.completed}
                    editable={this.state.editable}
                    title={this.props.title}
                    updateCard={this.updateCard}>
                </CardBody>

                <CardFooter
                    completed={this.props.completed}
                    onClickToDelete={this.deleteCard}
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

        this.props.onClickToCompleteTask(id);
    }

    deleteCard = () =>
    {
        const id = this.props.dataId;

        this.props.onClickToDeleteCard(id);
    }

    editCard = () =>
    {
        this.setState({
            editable: true
        })
    }

    setColorFromPicket = (color) =>
    {
        const id = this.props.dataId;

        this.props.setColorFromPicket(color, id);
    }

    updateCard = (text) =>
    {
        if (text !== this.props.text) {
            const id = this.props.dataId;

            this.props.updateCard(id, text);
        }

        this.setState({
            editable: false
        })
    }
}

export default Task;
