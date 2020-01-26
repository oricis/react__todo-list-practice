
import './styles.scss';
import React, { Component } from 'react';
import CardBody from './card-body/CardBody';
import CardFooter from './card-footer/CardFooter';
import CardHeader from './card-header/CardHeader';

class List extends Component
{
    state = {
        editable: false
    }

    render()
    {
        console.log('List / render()');
        const classNameForListCard = (this.props.selected)
            ? 'card list-card card-selected'
            : 'card list-card';

        return (
            <div className={classNameForListCard} data-id={this.props.dataId}>
                <CardHeader
                    onClickToEdit={this.editCard}>
                </CardHeader>

                <CardBody
                    editable={this.state.editable}
                    title={this.props.title}
                    description={this.props.description}
                    updateCard={this.updateCard}>
                </CardBody>

                <CardFooter
                    selected={this.props.selected}
                    onClickToDelete={this.deleteCard}
                    onClickToSelect={this.selectList}>
                </CardFooter>
            </div>
        );
    }


    ////////////////////////////////////////////////////////////////////
    // Actions

    selectList = () =>
    {
        const id = this.props.dataId;

        this.props.onClickToSelect(id);
    }

    deleteCard = () =>
    {
        const id = this.props.dataId;

        this.props.onClickToDeleteCard(id);
    }

    editCard = () =>
    {
        this.setState({
            editable: true
        })
    }

    updateCard = (text) =>
    {
        if (text !== this.props.text) {
            const id = this.props.dataId;

            this.props.updateCard(id, text);
        }

        this.setState({
            editable: false
        })
    }
}

export default List;
