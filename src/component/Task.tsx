import React, { FunctionComponent, useState, Component } from 'react';
import ActionButton from './ActionButton';
import { ITask } from '../interfaces';

import { E_BUTTON_TYPE } from '../interfaces/dataTypes';

interface ITaskComponentProps extends ITask {
    addTaskToDirectory: (task: any) => void;
    deleteTaskFromDirectory: (id: string) => void;
    id: string;
    isNewTask: boolean;
    checkATask: (id: string) => void;
}

const Task: FunctionComponent<ITaskComponentProps> = (props) => {
    const { addTaskToDirectory, description, deleteTaskFromDirectory, id, isChecked, isNewTask, checkATask } = props;
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskInput, setNewTaskInput] = useState('');

    if(isNewTask) {
        const taskDescriptionElement = document.getElementById('task-description-new');
        if(taskDescriptionElement) {
            if(isAddingTask) {
                taskDescriptionElement.style.display = 'none'
            } else {
                taskDescriptionElement.style.display = 'block'
            }
        }
    }
    const task: ITask = {
        description: newTaskInput,
        isChecked: false,
    }
    const handleAddTask: (() => void) = () => {
        addTaskToDirectory(task);
        setNewTaskInput('');
        setIsAddingTask(false);
    }
    const handleDeleteTask: (() => void) = () => {
        deleteTaskFromDirectory(id);
    }

    const handleToggleChecked: (() => void) = () => {
        checkATask(id)
    }

    const renderButton: ((isOnLeft: boolean) => void) = (isOnLeft: boolean) => {
        let actionButtonComponent;
        if(isNewTask) {
            if(isOnLeft) {
                actionButtonComponent = <ActionButton handleAction={handleAddTask} buttonType={E_BUTTON_TYPE.ADDING} />
            } else {
                if(isAddingTask) {
                    actionButtonComponent = <ActionButton handleAction={handleAddTask} buttonType={E_BUTTON_TYPE.ADD} />;
                }
            }
        } else {
            actionButtonComponent = isOnLeft ? <ActionButton isChecked={isChecked} handleAction={handleToggleChecked} buttonType={E_BUTTON_TYPE.CHECK} /> : <ActionButton isChecked={isChecked} handleAction={handleDeleteTask} buttonType={E_BUTTON_TYPE.DELETE} />;
        }
        return actionButtonComponent;
    }

    return <>
        <div className={`task-container ${isChecked ? 'disabled-container' : ''}`}>
            {renderButton(true)}
            <div className="task-details">
                {(isNewTask && isAddingTask) && <input className="task-description-input" type="text" value={newTaskInput} onChange={(e) => setNewTaskInput(e.target.value)} />}
                <p id={`task-description${isNewTask ? '-new' : ''}`} className={`task-description ${isNewTask ? 'disabled' : ''}${isAddingTask ? ' hide' : ''} ${isChecked ? 'disabled-text strike-text' : ''}`} onClick={() =>{isNewTask && setIsAddingTask(true)}} >{description}</p>
            </div>
            {renderButton(false)}
        </div>
    </>
}

export default Task;