
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
                        text={task.text}
                        dataId={task.id}></Task>
                )}
            </article>
        );
    }
}

export default Tasks;
