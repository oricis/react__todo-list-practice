import '../assets/styles/App.scss';
import React from 'react';
import Footer from "./footer/Footer";
import TaskList from "./task-list/TaskList";
import logo from '../assets/images/logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h3>TODO List</h3>
      </header>

      <TaskList></TaskList>

      <Footer
        author="Moisés Alcocer"
        year="2019"
        licence="MIT"></Footer>
    </div>
  );
}

export default App;
