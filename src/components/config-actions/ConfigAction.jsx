import './styles.scss';
import React, { Component } from 'react';
import swapIcon from '../../assets/images/buffer-brands.svg';
import ImageButton from '../common/image-button';

class ConfigActions extends Component
{

    render()
    {
        const formLabel = (this.props.formLabel)
            ? this.props.formLabel
            : '';

        let swapButton = <ImageButton
            className="image-btn"
            image={swapIcon}
            attrAlt={"Cambiar vista a " + this.props.actualMode}
            attrTitle={"Cambiar vista a " + this.props.actualMode}
            onClick={this.props.onClickSwapButton}>
        </ImageButton>;

        if (this.props.actualMode === 'lists'
            && this.props.listNumber === 0) {
            swapButton = '';
        }

        return (
            <div className="config-actions">
                <h2 className="text-label">{formLabel}</h2>

                {swapButton}
            </div>
        );
    }
}

export default ConfigActions;
