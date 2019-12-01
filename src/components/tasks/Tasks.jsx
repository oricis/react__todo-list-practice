
import './tasks.scss';
import React, { Component } from 'react';
import Task from '../task/Task';

class Tasks extends Component
{

    render()
    {
        const listOfTasks = this.composeTaskList(this.props.taskList);

        return (
            <article className="task-list">
                {listOfTasks}
            </article>
        );
    }


    composeTaskList(tasks)
    {
        return tasks.map(
            task => {
                return (
                    <Task key={task.id}
                        bgColor={task.color}
                        completed={task.completed}
                        text={task.text}
                        dataId={task.id}

                        onCompleteTask={(id) => { this.completeTask(id); }}
                        onDeleteTask={(id) => { this.deleteTask(id); }}>
                    </Task>
                );
            }
        );
    }

    ////////////////////////////////////////////////////////////////////
    // Actions

    completeTask = (id) => {
        this.props.onCompleteTask(id);
    }

    deleteTask = (id) => {
        this.props.onDeleteTask(id);
    }
}

export default Tasks;
