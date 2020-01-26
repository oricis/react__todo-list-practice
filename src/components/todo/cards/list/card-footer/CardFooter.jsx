
import './styles.scss';
import React, { Component } from 'react';

class CardFooter extends Component
{

    render()
    {
        const classNameForSelectBtn = (this.props.selected)
            ? 'btn btn-default'
            : 'btn btn-primary';

        return (
            <div className="card-footer">
                <button className={classNameForSelectBtn}
                    onClick={() => { this.props.onClickToSelect()}}>
                    Seleccionar
                </button>
                <button className="btn btn-primary"
                    onClick={() => { this.props.onClickToDelete()}}>
                    Eliminar
                </button>
            </div>
        );
    }
}

export default CardFooter;