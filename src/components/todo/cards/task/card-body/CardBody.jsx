
import './styles.scss';
import React, { Component, Fragment } from 'react';

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
            <Fragment>
                <div className="card-title">
                    {title}
                </div>
            </Fragment>
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

        this.props.updateTask(title);
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
