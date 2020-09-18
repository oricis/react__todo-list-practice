
import './styles.scss';
import React, { Component } from 'react';

class CardBody extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            title: props.title,
        }
    }

    render()
    {
        const descriptionClassName = (this.props.showDetails)
            ? 'card-description d-block'
            : 'card-description';
        const description = (this.props.description)
            ? <div className={descriptionClassName}>
                {this.props.description}
            </div>
            : '';

        const titleText = this.state.title;
        const title = (this.props.completed)
            ? <span className="strikethrough-text opacity50">
                {titleText}
            </span>
            : (this.props.editable) // is true when click the "edit button"
                ? <input type="text"
                    value={titleText}
                    autoFocus
                    onBlur={this.emitCardData}
                    onChange={this.setTitleOnState}
                    onKeyUp={this.checkPushedKey} />
                : <span>{titleText}</span>;

        return (
            <div className="card-body">
                <div className="card-title">
                    {title}
                </div>
                {description}
            </div>
        );
    }


    checkPushedKey = (event) =>
    {
        if (event.key === 'Enter') {
            this.emitCardData();
        }
    }

    emitCardData = () =>
    {
        // trim only before send to storage
        const title = this.state.title.trim();

        this.props.updateCard(title);
    }

    setTitleOnState = (event) =>
    {
        const title = event.target.value;
        this.setState({
            title: title
        });
    }
}

export default CardBody;
