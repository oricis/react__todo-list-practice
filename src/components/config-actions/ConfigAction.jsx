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
        const nextScreenName = this.getNextScreenName(this.props.actualMode);

        let swapButton = <ImageButton
            className="image-btn"
            image={swapIcon}
            attrAlt={"Cambiar a vista de " + nextScreenName}
            attrTitle={"Cambiar a vista de " + nextScreenName}
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

    getNextScreenName = (appMode) =>
    {
        if (appMode === 'lists')
            return 'Tareas';

        return 'Listas';
    }
}

export default ConfigActions;
