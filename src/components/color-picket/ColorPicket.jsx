import './color-picket.scss';
import Picket from './picket/Picket';
import React, { Component } from 'react';

class ColorPicket extends Component
{

    render()
    {
        return (
            <div className="color-picket">
                <div style={{ background: this.props.bgColor }}></div>
                <Picket selectedColor={this.props.bgColor}></Picket>
            </div>
        );
    }
}

export default ColorPicket;
