import './styles.scss';
import React, { Component, Fragment } from 'react';
import swapIcon from '../../assets/images/buffer-brands.svg';
import ImageButton from '../common/image-button';

class ConfigActions extends Component
{

    render()
    {
        const labelText = (this.props.formLabel)
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

        let labelContent = '';
        labelContent = (this.props.actualMode === 'tasks')
            ?   <Fragment>
                    <em>Lista actual:<br/></em>
                    {labelText}
                </Fragment>
            :   <em>
                    {labelText}
                </em>;

        return (
            <div className="config-actions">
                <h2 className="text-label">
                    {labelContent}
                </h2>

                {swapButton}
            </div>
        );
    }
}

export default ConfigActions;
