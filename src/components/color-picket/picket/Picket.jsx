import './picket.scss';
import React, { Component } from 'react';

class Picket extends Component {

    render() {
        return (
            <div className="picket">
                <div class="color-box bg-green selected"></div>
                <div class="color-box bg-yellow"></div>
                <div class="color-box bg-red"></div>
            </div>
        );
    }

    selectColor = (event) => {
        const cssClasses = event.target.className;
        console.log('cssClasses -> ' + cssClasses);
    }
}

export default Picket;
