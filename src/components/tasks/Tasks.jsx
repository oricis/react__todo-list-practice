
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

                        setColorFromPicket={this.setColorFromPicket}
                        onCompleteTask={(id) => { this.completeTask(id); }}
                        onDeleteTask={(id) => { this.deleteTask(id); }}
                        updateTask={this.props.updateTask}>
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

    setColorFromPicket = (color, taskId) =>
    {
        this.props.setColorFromPicket(color, taskId);
    }
}

export default Tasks;
