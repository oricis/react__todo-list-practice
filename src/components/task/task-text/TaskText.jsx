
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
                        : (this.props.editable)
                            ? <input type="text" value={this.props.text} autoFocus />
                            : <span>{this.props.text}</span>

                }
            </div>
        );
    }
}

export default TaskText;
