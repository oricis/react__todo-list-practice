
import './styles.scss';
import React, { Component } from 'react';
import ColorPicket from '../../../../../common/color-picket/ColorPicket';
import ImageButton from '../../../../../common/image-button';
import editIcon from '../../../../../../assets/images/edit-regular.svg';

class CardHeader extends Component
{

    render()
    {
        const editButton = (this.props.completed)
            ? ''
            : <ImageButton
                className="image-btn"
                image={editIcon}
                attrAlt="Editar tarea"
                attrTitle="Editar tarea"
                onClick={this.props.onClickToEdit}>
            </ImageButton>;

        return (
            <div className="card-header">
                {editButton}

                <ColorPicket
                    bgColor={this.props.bgColor}
                    completed={this.props.completed}
                    setColorFromPicket={this.props.setColorFromPicket}>
                </ColorPicket>
            </div>
        );
    }
}

export default CardHeader;
