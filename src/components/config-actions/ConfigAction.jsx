import './styles.scss';
import React, { Component } from 'react';
import swapIcon from '../../assets/images/buffer-brands.svg';
import ImageButton from '../common/image-button';
import TextLabel from '../common/text-label';

class ConfigActions extends Component
{

    render()
    {
        const formLabel = (this.props.formLabel)
            ? this.props.formLabel
            : '';

        return (
            <div className="config-actions">
                <TextLabel
                    text={formLabel}>
                </TextLabel>

                <ImageButton
                    className="image-btn"
                    image={swapIcon}
                    attrAlt={"Cambiar modo a " + this.actualMode}
                    attrTitle={"Cambiar modo a " + this.actualMode}
                    onClick={this.props.onClickSwapButton}>
                </ImageButton>
            </div>
        );
    }
}

export default ConfigActions;
