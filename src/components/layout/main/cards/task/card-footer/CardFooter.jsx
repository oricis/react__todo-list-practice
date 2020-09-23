
import './styles.scss';
import React, { Component } from 'react';

class CardFooter extends Component
{

    render()
    {
        const classNameForCompleteBtn = (this.props.completed)
            ? 'btn btn-default btn-disabled'
            : 'btn btn-primary';

        const completeBtnTitle = this.props.completed
            ? ''
            : 'Marcar tarea como completada';
        return (
            <div className="card-footer">
                <button className={classNameForCompleteBtn}
                    title={completeBtnTitle}
                    disabled={this.props.completed}
                    onClick={() => {this.props.onClickToComplete()}}>
                    Completada
                </button>
                <button className="btn btn-primary"
                    title="Eliminar tarea"
                    onClick={() => { this.props.onClickToDelete()}}>
                    Eliminar
                </button>
            </div>
        );
    }
}

export default CardFooter;
