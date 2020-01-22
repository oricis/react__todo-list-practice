import './styles.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConfigActions from '../../config-actions/ConfigAction';
// import ImageButton from '../../common/image-button';
import TextButton from '../../common/text-button';

class TaskForm extends Component
{

    constructor(props)
    {
        super(props);

        const INITIAL = {
            title: '',
        };

        this.state = INITIAL;
    }

    render()
    {
        return (
            <article className="content-box data-intro">
                <ConfigActions
                    formLabel="Nueva Tarea"
                    onClickSwapButton={this.props.onClickSwapButton}>
                </ConfigActions>

                <div className="creation-form">
                    <input type="title"
                        id="create-task"
                        placeholder="¿Cuál es la tarea?"
                        value={this.state.title}
                        onChange={event =>
                            this.setState({ title: event.target.value.trim() })
                        }
                        onKeyUp={this.checkFormWhenPushEnterKey} />

                    <TextButton
                        className="btn"
                        text="Añadir"
                        onClick={this.emitFormData}></TextButton>
                    <TextButton
                        className="btn"
                        text="Limpiar"
                        onClick={this.cleanForm}></TextButton>
                </div>
            </article>
        );
    }


    /**
     * Custom methods
     * Create task form actions
     *
     */

    checkFormWhenPushEnterKey = (event) => {
        if (event.key === 'Enter') {
            this.emitFormData();
        }
    }

    cleanForm = () =>
    {
        this.setState({
            title: ''
        });
    }

    emitFormData = () =>
    {
        const title = this.state.title;
        this.props.addTask(title);
    }
}

// Setting the proptypes of the component
TaskForm.propTypes = {
    id    : PropTypes.string,
    title : PropTypes.string
};

export default TaskForm;
