
import './styles.scss';
import React, { Component } from 'react';
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
        // TODO: create custom card
        return data.map(
            list => {
                return (
                    <Task key={list.id}
                        selected={list.selected}
                        title={list.text}
                        description={list.description}
                        dataId={list.id}

                        onSelectedTask={(id) => { this.onSelectedTask(id); }}
                        onDeleteTask={(id) => { this.deleteTask(id); }}
                        updateTask={this.props.updateTask}>
                    </Task>
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
                        onCompleteTask={(id) => { this.completeTask(id); }}
                        onDeleteTask={(id) => { this.deleteTask(id); }}
                        updateTask={this.props.updateTask}>
                    </Task>
                );
            }
        );
    }

    ////////////////////////////////////////////////////////////////////
    // Actions

    completeTask = (id) => {
        this.props.onCompleteTask(id);
    }

    deleteTask = (id) => {
        this.props.onDeleteTask(id);
    }

    setColorFromPicket = (color, taskId) =>
    {
        this.props.setColorFromPicket(color, taskId);
    }
}

export default Cards;
