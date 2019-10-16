
import './tasks.scss';
import React, { Component } from 'react';
import Task from '../task/Task';

class Tasks extends Component
{
    constructor(props)
    {
        super(props);

        // Set default values
        this.state = {
            tasks: props.taskList
        };
    }

    render()
    {
        return (
            <article className="task-list">
                {this.state.tasks.map(
                    task => <Task key={task.id}
                        bgColor={task.bgColor}
                        text={task.text}
                        dataId={task.id}></Task>
                )}
            </article>
        );
    }
}

export default Tasks;
