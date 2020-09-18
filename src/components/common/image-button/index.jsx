import React, { Component } from 'react';
import './styles.scss';

class ImageButton extends Component
{

    render()
    {
        const btnContent = (this.props.image)
            ? <img src={this.props.image}
                alt={this.props.attrAlt}
                title={this.props.attrTitle}
                className={this.props.btnClassName} />

            : <i className={this.props.btnClassName}
                title={this.props.attrTitle}></i>

        return (
            <div className={this.props.className}
                role="button"
                onClick={this.emitOnClick}>
                {btnContent}
            </div>
        );
    }


    emitOnClick = () => {
        this.props.onClick()
    }
}

export default ImageButton;
