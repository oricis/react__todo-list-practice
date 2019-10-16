import './color-picket.scss';
import React, { Component } from 'react';

class ColorPicket extends Component
{

    render()
    {
        console.log(this.props.bgColor);
        return (
            <div className="color-picket">
                <div style={{ background: this.props.bgColor }}></div>
            </div>
        );
    }
}

export default ColorPicket;
