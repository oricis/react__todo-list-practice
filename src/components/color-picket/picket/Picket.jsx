import './picket.scss';
import React, { Component } from 'react';

class Picket extends Component
{
    defaultComponentClassName = 'picket';
    defaultColorCircleClassName = 'color-box color-circle';
    greenClassName  = 'bg-green';
    redClassName    = 'bg-red';
    yellowClassName = 'bg-yellow';


    render()
    {
        this.resetColorClasses();

        this.setSelectedColor(this.props.selectedColor);
        const componentClassName = (this.props.isVisible)
            ? this.defaultComponentClassName + ' d-flex'
            : this.defaultComponentClassName + ' d-none';

        return (
            <div className={componentClassName}>
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
        this.greenClassName  = this.defaultColorCircleClassName + ' bg-green';
        this.redClassName    = this.defaultColorCircleClassName + ' bg-red';
        this.yellowClassName = this.defaultColorCircleClassName + ' bg-yellow';
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
