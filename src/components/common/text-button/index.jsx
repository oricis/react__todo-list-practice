import React, { Component } from 'react';

class TextButton extends Component
{

    constructor(props)
    {
        super(props);

        const defaultClassName = 'btn btn-primary';
        const defaultText = 'One button!';
        const defaultTitle = defaultText;

        this.className = props.className
            ? props.className
            : defaultClassName;
        this.text = props.text
            ? props.text
            : defaultText;
        this.title = props.title
            ? props.title
            : defaultTitle;
    }

    render()
    {

        return (
            <button
                className={this.className}
                id={this.props.id}
                title={this.title}
                type={this.props.type}
                onClick={this.props.onClick}>
                {this.text}
            </button>
        );
    }
}

export default TextButton;
