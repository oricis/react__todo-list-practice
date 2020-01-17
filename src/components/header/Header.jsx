import './header.scss';
import React from 'react';


function Header(props)
{

    return (
        <header className="App-header">
            <img src={props.logo} className="App-logo" alt="logo" />

            <h3>{props.title}</h3>
        </header>
    );
}

export default Header;
