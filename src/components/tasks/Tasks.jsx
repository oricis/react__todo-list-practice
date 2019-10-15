
import './tasks.css';
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
                <Task text={this.state.tasks[0].text}
                    dataId={this.state.tasks[0].id}></Task>
                <Task text={this.state.tasks[1].text}
                    dataId={this.state.tasks[1].id}></Task>
            </article>
        );
    }
}

export default Tasks;
