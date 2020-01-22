import './styles.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConfigActions from '../../config-actions/ConfigAction';
// import ImageButton from '../../common/image-button';
import TextButton from '../../common/text-button';

class ListForm extends Component
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
            <article className="content-box data-intro">
                <ConfigActions
                    onClickSwapButton={this.props.onClickSwapButton}>
                </ConfigActions>

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
ListForm.propTypes = {
    id:   PropTypes.string,
    text: PropTypes.string
};

export default ListForm;
