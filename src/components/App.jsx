import React from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h3>TODO List</h3>
      </header>

      <section class="App-body">
        <article>
            <label htmlFor="create-task">Introduce una tarea:</label>
            <input type="text" id="create-task" />
        </article>

        <article class="task-list">
            <div class="task">
                <p class="task-title">Foo</p>
                <input type="button" class="btn" value="Completada" />
                <input type="button" class="btn" value="Eliminar" />
            </div>
            <div class="task">
                <p class="task-title">Lorem ipsum</p>
                <input type="button" class="btn" value="Completada" />
                <input type="button" class="btn" value="Eliminar" />
            </div>
        </article>
      </section>
    </div>
  );
}

export default App;
