
import './task-text.scss';
import React, { Component } from 'react';

class TaskText extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            text: props.text,
        }
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
                            ? <input type="text"
                                value={this.state.text}
                                autoFocus
                                onBlur={this.updateTask}
                                onChange={this.changeText}
                                onKeyUp={this.saveText} />
                            : <span>{this.props.text}</span>
                }
            </div>
        );
    }


    changeText = (event) =>
    {
        this.setState({ text: event.target.value })
    }

    saveText = (event) =>
    {
        if (event.key === 'Enter') {
            this.updateTask(event);
        }
    }

    updateTask = (event) =>
    {
        const text = event.target.value.trim();
        this.props.updateTask(text);
    }
}

export default TaskText;
