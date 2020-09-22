import './styles.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConfigActions from '../config-actions/ConfigAction';
// import ImageButton from '../../common/image-button';
import TextButton from '../common/text-button';

class ListForm extends Component
{

    constructor(props)
    {
        super(props);

        const INITIAL = {
            title       : '',
            description : '',
        };

        this.state = INITIAL;
    }

    render()
    {
        return (
            <section className="content-box data-intro">
                <ConfigActions
                    actualMode="lists"
                    listNumber={this.props.listNumber}
                    formLabel="Nueva lista"
                    onClickSwapButton={this.props.onClickSwapButton}>
                </ConfigActions>

                <div className="form">
                    <label htmlFor="input-title" className="d-none">
                        Escribe un título para la tarea</label>
                    <input type="text"
                        id="input-title"
                        placeholder="¿Título de la lista?"
                        value={this.state.title}
                        onChange={event =>
                            this.setState({ title: event.target.value })
                        }
                        onKeyUp={event =>
                            this.checkFormWhenPushEnterKey(event)
                        } />
                    <label htmlFor="input-description" className="d-none">
                        Escribe una descripción para la tarea</label>
                    <input type="text"
                        id="input-description"
                        placeholder="¿Descripción de la lista?"
                        value={this.state.description}
                        onChange={event =>
                            this.setState({ description: event.target.value })
                        }
                        onKeyUp={event =>
                            this.checkFormWhenPushEnterKey(event)
                        } />

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
     * Create list form actions
     *
     */

    checkFormWhenPushEnterKey = (event) =>
    {
        if (event.key === 'Enter') {
            this.emitFormData();
        }
    }

    cleanForm = () =>
    {
        this.setState({
            title      : '',
            description: ''
        });
    }

    emitFormData = () =>
    {
        const title       = this.state.title.trim();
        const description = this.state.description.trim();
        this.props.addList(title, description);
    }
}

// Setting the proptypes of the component
ListForm.propTypes = {
    id          : PropTypes.string,
    title       : PropTypes.string,
    description : PropTypes.string
};

export default ListForm;
