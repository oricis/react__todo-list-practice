import './styles.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConfigActions from '../config-actions/ConfigAction';
// import ImageButton from '../../common/image-button';
import TextButton from '../common/text-button';

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
        const label = this.props.selectedListText;

        return (
            <section className="content-box data-intro">
                <ConfigActions
                    actualMode="tasks"
                    formLabel={label}
                    onClickSwapButton={this.props.onClickSwapButton}>
                </ConfigActions>

                <div className="creation-form">
                    <input type="text"
                        id="input-title"
                        placeholder="¿Cuál es la tarea?"
                        value={this.state.title}
                        onChange={event =>
                            this.setState({ title: event.target.value })
                        }
                        onKeyUp={this.checkFormWhenPushEnterKey} />

                    <div className="button-group">
                        <TextButton
                            className="btn"
                            text="Añadir"
                            onClick={this.emitFormData}></TextButton>
                        <TextButton
                            className="btn"
                            text="Limpiar"
                            onClick={this.cleanForm}></TextButton>
                    </div>
                </div>
            </section>
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
        const title = this.state.title.trim();
        this.props.addTask(title);
    }
}

// Setting the proptypes of the component
TaskForm.propTypes = {
    id    : PropTypes.string,
    title : PropTypes.string
};

export default TaskForm;
