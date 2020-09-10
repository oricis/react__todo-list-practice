import '../assets/styles/App.scss';
import React from 'react';
import Footer from "./layout/footer/Footer";
import Header from "./layout/header/Header";
import Main from "./layout/main/Main";
import logo from '../assets/images/logo.svg';

function App()
{

    return (
        <div className="App">
            <Header
                logo={logo}
                title="TODO List"></Header>

            <Main />

            <Footer
                author="Moisés Alcocer"
                year="2019"
                licence="MIT"></Footer>
        </div>
    );
}

export default App;
