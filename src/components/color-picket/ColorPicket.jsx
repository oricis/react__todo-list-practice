import './color-picket.scss';
import Picket from './picket/Picket';
import React, { Component } from 'react';

class ColorPicket extends Component
{
    actualColorClassName = 'actualColor';


    render()
    {
        if (this.props.bgColor) {
            this.actualColorClassName += ' bg-' + this.props.bgColor;
        }

        return (
            <div className="color-picket">
                <div className={this.actualColorClassName}></div>

                <Picket
                    selectedColor={this.props.bgColor}
                    setColorFromPicket={this.setColorFromPicket}>
                </Picket>
            </div>
        );
    }


    setColorFromPicket(color)
    {
        console.log('ColorPicket - setColorFromPicket() - COLOR: ' + color);
    }
}

export default ColorPicket;
