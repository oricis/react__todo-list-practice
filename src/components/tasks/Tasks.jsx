
import './tasks.scss';
import React, { Component } from 'react';
import Task from '../task/Task';

class Tasks extends Component
{

    render()
    {

        return (
            <article className="task-list">
                {this.props.taskList.map(
                    task => <Task key={task.id}
                        bgColor={task.color}
                        completed={task.completed}
                        text={task.text}
                        dataId={task.id}
                        onCompleteTask={(id) => { this.completeTask(id); }}
                        onDeleteTask={(id) => { this.deleteTask(id); }}></Task>
                )}
            </article>
        );
    }


    completeTask = (id) => {
        this.props.onCompleteTask(id);
    }

    deleteTask = (id) => {
        this.props.onDeleteTask(id);
    }
}

export default Tasks;
