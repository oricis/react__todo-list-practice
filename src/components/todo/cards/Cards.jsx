
import './styles.scss';
import React, { Component } from 'react';
import List from './list/List';
import Task from './task/Task';

class Cards extends Component
{

    render()
    {
        const cards = (this.props.mode === 'tasks')
            ? this.composeTasks(this.props.data)
            : this.composeLists(this.props.data);

        return (
            <article className="task-list">
                {cards}
            </article>
        );
    }


    composeLists(data)
    {
        // TODO: create custom card to use with List
        return data.map(
            list => {
                return (
                    <List key={list.id}
                        selected={list.selected}
                        title={list.text}
                        description={list.description}
                        dataId={list.id}

                        onClickToSelectList={(id) => { this.selectList(id); }}
                        onClickToDeleteCard={(id) => { this.deleteCard(id); }}
                        updateCard={this.props.updateCard}>
                    </List>
                );
            }
        );
    }

    composeTasks(data) {
        return data.map(
            task => {
                return (
                    <Task key={task.id}
                        bgColor={task.color}
                        completed={task.completed}
                        title={task.text}
                        dataId={task.id}

                        setColorFromPicket={this.setColorFromPicket}
                        onClickToCompleteTask={(id) => { this.completeTask(id); }}
                        onClickToDeleteCard={(id) => { this.deleteCard(id); }}
                        updateCard={this.props.updateCard}>
                    </Task>
                );
            }
        );
    }

    ////////////////////////////////////////////////////////////////////
    // Actions

    completeTask = (id) => {
        this.props.onClickToCompleteTask(id);
    }

    deleteCard = (id) => {
        this.props.onClickToDeleteCard(id);
    }

    selectList = (id) => {
        this.props.onClickToSelectList(id);
    }

    setColorFromPicket = (color, taskId) =>
    {
        this.props.setColorFromPicket(color, taskId);
    }
}

export default Cards;
