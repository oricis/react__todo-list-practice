
import './styles.scss';
import React, { Component } from 'react';

class CardFooter extends Component
{

    render()
    {
        const classNameForSelectBtn = (this.props.selected)
            ? 'btn btn-default btn-disabled'
            : 'btn btn-primary';
        const selectBtnTitle = this.props.selected
            ? ''
            : 'Seleccionar lista';
        return (
            <div className="card-footer">
                <button className={classNameForSelectBtn}
                    title={selectBtnTitle}
                    disabled={this.props.selected}
                    onClick={() => { this.props.onClickToSelect()}}>
                    Seleccionar
                </button>
                <button className="btn btn-primary"
                    title="Eliminar lista"
                    onClick={() => { this.props.onClickToDelete()}}>
                    Eliminar
                </button>
            </div>
        );
    }
}

export default CardFooter;
