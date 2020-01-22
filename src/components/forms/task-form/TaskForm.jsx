import './styles.scss';
import React, { Component } from 'react';
import Storage from '../../../services/Storage.js';
import swapIcon from '../../../assets/images/buffer-brands.svg';
import PropTypes from 'prop-types';
import ImageButton from '../../common/image-button';
import TextButton from '../../common/text-button';
import TextLabel from '../../common/text-label';

class TaskForm extends Component
{

    constructor(props)
    {
        super(props);

        const INITIAL = {
            newText: '',
        };

        this.state = INITIAL;
    }

    render()
    {
        return (
            <article className="content-box task-intro">
                <div className="config-actions">
                    <TextLabel
                        text="Lorem ipsum">
                    </TextLabel>

                    <ImageButton
                        className="image-btn"
                        image={swapIcon}
                        attrAlt={"Cambiar modo a " + this.actualMode}
                        attrTitle={"Cambiar modo a " + this.actualMode}
                        onClick={this.props.onClickSwapButton}>
                    </ImageButton>
                </div>

                <div className="creation-form">
                    <input type="text"
                        id="create-task"
                        placeholder="Introduce una tarea..."
                        value={this.state.newText}
                        onChange={event =>
                            this.setState({ newText: event.target.value })
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
                </div>
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
            newText: ''
        });
    }
}

// Setting the proptypes of the component
TaskForm.propTypes = {
    id:   PropTypes.string,
    text: PropTypes.string
};

export default TaskForm;
