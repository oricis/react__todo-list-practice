import './color-picket.scss';
import React, { Component } from 'react';

class ColorPicket extends Component
{

    render()
    {
        return (
            <div className="color-picket">
                <div style={{ background: this.props.bgColor }}></div>
            </div>
        );
    }
}

export default ColorPicket;
