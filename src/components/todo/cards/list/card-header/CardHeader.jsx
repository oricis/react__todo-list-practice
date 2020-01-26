
import './styles.scss';
import React, { Component } from 'react';
import editIcon from '../../../../../assets/images/edit-regular.svg';
import minusCircleIcon from '../../../../../assets/images/minus-circle-solid.svg';
import plusCircleIcon from '../../../../../assets/images/plus-circle-solid.svg';
import ImageButton from '../../../../common/image-button';

class CardHeader extends Component
{

    render()
    {
        const editButton = (this.props.completed)
            ? ''
            : <ImageButton
                className="image-btn"
                image={editIcon}
                attraAlt="Editar"
                attrtTitle="Editar"
                onClick={this.props.onClickToEdit}>
            </ImageButton>;

        const showOrHideDetailsButton = (this.props.showDetails)
            ? <ImageButton
                className="image-btn pull-right"
                image={minusCircleIcon}
                attraAlt="Ocultar detalles"
                attrtTitle="Ocultar detalles"
                onClick={this.props.onClickToHideDetails}>
            </ImageButton>
            : <ImageButton
                className="image-btn pull-right"
                image={plusCircleIcon}
                attraAlt="Ver detalles"
                attrtTitle="Ver detalles"
                onClick={this.props.onClickToShowDetails}>
            </ImageButton>;

        return (
            <div className="card-header">
                {editButton}

                {showOrHideDetailsButton}
            </div>
        );
    }
}

export default CardHeader;
