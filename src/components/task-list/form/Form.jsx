import './form.scss';
import React, { Component } from 'react';
import Storage from '../../../services/Storage.js';
import PropTypes from 'prop-types';
import TextButton from '../../common/text-button';

class Form extends Component
{
    constructor(props)
    {
        super(props);

        // Set default values
        this.defaultTaskColor = 'green';
        this.storage = new Storage();

        const data = this.storage.get('stored-tasks');
        const INITIAL = {
            newTaskText: '',
            tasks: data,
        };

        this.state = INITIAL;
    }

    render()
    {
        return (
            <article className="content-box task-intro">
                <input type="text"
                    id="create-task"
                    placeholder="Introduce una tarea..."
                    value={this.state.newTaskText}
                    onChange={event =>
                        this.setState({ newTaskText: event.target.value })
                    }
                    onKeyUp={this.addTask} />

                <TextButton
                    className="btn"
                    text="Añadir"
                    onClick={this.addTaskFromInput}></TextButton>
                <TextButton
                    className="btn"
                    text="Limpiar"
                    onClick={this.cleanTaskInput}></TextButton>
            </article>
        );
    }

    /**
     * Custom methods
     * Create task form actions
     *
     */

    addTask = (event) => {
        if (event.key === 'Enter') {
            const text = event.target.value.trim();
            this.props.addTask(text);
        }
    }

    addTaskFromInput = () => {
        const text = document.getElementById('create-task').value.trim();
        this.props.addTask(text);
    }

    cleanTaskInput = () => {
        this.setState({
            newTaskText: ''
        });
    }
}

// Setting the proptypes of the component
Form.propTypes = {
    id:     PropTypes.string,
    tasks:  PropTypes.array,
    text:   PropTypes.string
};

export default Form;
