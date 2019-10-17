
import './tasks.scss';
import React, { Component } from 'react';
import Task from '../task/Task';

class Tasks extends Component
{

    completeTask = (id) => {
        console.log('Tasks / completeTask() - ID: ' + id); // HACK:

        this.props.onCompleteTask(id);
    }

    deleteTask = (id) => {
        console.log('Tasks / deleteTask() - ID: ' + id); // HACK:

        this.props.onDeleteTask(id);
    }

    render()
    {
        return (
            <article className="task-list"/* onDeleteTask={this.deleteTask}*/>
                {this.props.taskList.map(
                    task => <Task key={task.id}
                        bgColor={task.color}
                        completed={task.completed}
                        text={task.text}
                        dataId={task.id}
                        onCompleteTask={(id) => { this.completeTask(id); }}
                        onDeleteTask={(id) => { this.deleteTask(id); }}></Task>
                )}
            </article>
        );
    }
}

export default Tasks;
