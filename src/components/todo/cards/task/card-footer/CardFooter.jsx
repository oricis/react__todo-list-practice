
import './styles.scss';
import React, { Component, Fragment } from 'react';

class CardFooter extends Component
{

    render()
    {
        const classNameForCompleteBtn = (this.props.completed)
            ? 'btn btn-default'
            : 'btn btn-primary';

        return (
            <Fragment>
                <button className={classNameForCompleteBtn}
                    disabled={this.props.completed}
                    onClick={() => {this.props.onClickToComplete()}}>
                    Completada
                </button>
                <button className="btn btn-primary"
                    onClick={() => { this.props.onClickToDelete()}}>
                    Eliminar
                </button>
            </Fragment>
        );
    }
}

export default CardFooter;
