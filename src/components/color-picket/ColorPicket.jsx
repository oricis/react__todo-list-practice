import './color-picket.scss';
import Picket from './picket/Picket';
import React, { Component } from 'react';

class ColorPicket extends Component
{
    actualColorClassName = 'actualColor color-circle';
    state = { colorSelectorVisible: false }
    taskColorClassName   = '';


    render()
    {
        if (this.props.bgColor) {
            this.taskColorClassName
                = this.actualColorClassName + ' bg-' + this.props.bgColor;
        }
        const classToShowColor = (this.state.colorSelectorVisible)
            ? ' d-none' : ' d-block';
        this.taskColorClassName += classToShowColor;

        const taskColor = (this.props.completed)
            ? <div className={this.taskColorClassName}
                title="Cambiar color">
            </div>
            : <div className={this.taskColorClassName}
                title="Cambiar color"
                onClick={this.swapPicketVisibility}>
            </div>;

        return (
            <div className="color-picket">
                {taskColor}

                <Picket
                    isVisible={this.state.colorSelectorVisible}
                    selectedColor={this.props.bgColor}
                    setColorFromPicket={this.setColorFromPicket}>
                </Picket>
            </div>
        );
    }


    ////////////////////////////////////////////////////////////////////
    // Actions

    setColorFromPicket = (color) =>
    {
        this.props.setColorFromPicket(color);

        this.swapPicketVisibility();
    }

     swapPicketVisibility = () =>
    {
        this.setState({
            colorSelectorVisible: ! this.state.colorSelectorVisible
        })
    }
}

export default ColorPicket;
