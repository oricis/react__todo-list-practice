import './picket.scss';
import React, { Component } from 'react';

class Picket extends Component
{
    greenClassName  = 'color-box bg-green';
    redClassName    = 'color-box bg-red';
    yellowClassName = 'color-box bg-yellow';


    render()
    {
        this.setSelectedColor(this.props.selectedColor);

        return (
            <div className="picket">
                <div className={this.greenClassName}
                    onClick={this.setColor}></div>
                <div className={this.redClassName}
                    onClick={this.setColor}></div>
                <div className={this.yellowClassName}
                    onClick={this.setColor}></div>
            </div>
        );
    }


    resetColorClasses = () =>
    {
        this.greenClassName  = 'color-box bg-green';
        this.redClassName    = 'color-box bg-red';
        this.yellowClassName = 'color-box bg-yellow';
    }

    setSelectedColor = (selectColor) =>
    {
        this.resetColorClasses();

        switch (selectColor) {
            case 'green':
                this.greenClassName += ' selected';
                break;

            case 'red':
                this.redClassName += ' selected';
                break;

            case 'yellow':
                this.yellowClassName += ' selected';
                break;

            default:
                this.greenClassName += ' selected';
                break;
        }
    }

    ////////////////////////////////////////////////////////////////////
    // Actions

    setColor = (event) =>
    {
        const cssClasses = event.target.className;
        if (cssClasses.includes('selected')) {
            return;
        }

        const colorBeginAt = cssClasses.indexOf('bg-') + 3;
        const clickedColor = cssClasses.substring(colorBeginAt);

        this.props.setColorFromPicket(clickedColor);
    }
}

export default Picket;
