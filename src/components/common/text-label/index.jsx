import React, { Component } from 'react';
import './styles.scss';

class TextLabel extends Component
{
    constructor(props)
    {
        super(props);

        const defaultClassName = 'text-label';

        this.className = props.className
            ? props.className
            : defaultClassName;
    }

    render() {

        return (
            <div
                className={this.className}
                id={this.props.id}>
                {this.props.text}
            </div>
        );
    }
}

export default TextLabel;
