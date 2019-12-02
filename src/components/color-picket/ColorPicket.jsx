import './color-picket.scss';
import Picket from './picket/Picket';
import React, { Component } from 'react';

class ColorPicket extends Component
{
    actualColorClassName = 'actualColor';
    taskColorClassName   = '';


    render()
    {
        if (this.props.bgColor) {
            this.taskColorClassName
                = this.actualColorClassName + ' bg-' + this.props.bgColor;
        }

        return (
            <div className="color-picket">
                <div className={this.taskColorClassName}></div>

                <Picket
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
    }
}

export default ColorPicket;
