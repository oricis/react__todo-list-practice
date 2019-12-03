
import './task-text.scss';
import React, { Component } from 'react';

class TaskText extends Component
{

    constructor(props)
    {
        super(props);
    }

    render()
    {

        return (
            <div className="task-title">
                {
                    (this.props.completed)
                        ? <span className="strikethrough-text opacity50">
                            {this.props.text}
                        </span>
                        : this.props.text
                }
            </div>
        );
    }
}

export default TaskText;
