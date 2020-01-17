import '../assets/styles/App.scss';
import React from 'react';
import Footer from "./footer/Footer";
import Header from "./header/Header";
import TaskList from "./task-list/TaskList";
import logo from '../assets/images/logo.svg';

function App()
{

    return (
        <div className="App">
            <Header
                logo={logo}
                title="TODO List"></Header>

            <section className="App-task-list">
                <TaskList></TaskList>
            </section >

            <Footer
                author="Moisés Alcocer"
                year="2019"
                licence="MIT"></Footer>
        </div>
    );
}

export default App;
