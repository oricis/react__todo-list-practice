import './header.scss';
import React from 'react';


function Header(props)
{

    return (
        <header className="App-header">
            <img src={props.logo} className="App-logo" alt="logo" />

            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;
