
import './styles.scss';
import React, { Component, Fragment } from 'react';
import editIcon from '../../../../../assets/images/edit-regular.svg';
import ColorPicket from '../../../../common/color-picket/ColorPicket';
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

        return (
            <Fragment>
                {editButton}

                <ColorPicket
                    bgColor={this.props.bgColor}
                    completed={this.props.completed}
                    setColorFromPicket={this.props.setColorFromPicket}>
                </ColorPicket>
            </Fragment>
        );
    }
}

export default CardHeader;
