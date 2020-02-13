import React, { FunctionComponent, useState } from 'react';
import { ITask } from '../interfaces';

import trashIcon from '../assets/trash.png';
import plusIcon from '../assets/plus.png'

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
                taskDescriptionElement.style.display = "none"
            } else {
                taskDescriptionElement.style.display = "block"
            }
        }
    }
    const task: ITask = {
        description: newTaskInput,
        isChecked: false
    }
    const handleAddTask = () => {
        addTaskToDirectory(task);
        setNewTaskInput('');
        setIsAddingTask(false);
    }
    
    const handleDeleteTask = (id: string) => {
        deleteTaskFromDirectory(id);
    }

    const handleToggleChecked = (e: any, id: string) => {
        checkATask(id)
    }

    return <>
        <div className={`task-container ${isChecked ? 'disabled-container' : ''}`}>
            <div className="task-checker">
                {!isNewTask ? <input className="task-checkbox" type="checkbox" name="checked" onChange={(e) => handleToggleChecked(e, id)} checked={isChecked}/> : <img src={plusIcon} onClick={() =>setIsAddingTask(true)} className="new-task-add-icon" />}
            </div>
            <div className="task-details">
                {(isNewTask && isAddingTask) && <input className="task-description-input" type="text" value={newTaskInput} onChange={(e) => setNewTaskInput(e.target.value)} />}
                <p id={`task-description${isNewTask ? '-new' : ''}`} className={`task-description ${isNewTask ? 'disabled' : ''}${isAddingTask ? ' hide' : ''} ${isChecked ? 'disabled-text strike-text' : ''}`} onClick={() =>{isNewTask && setIsAddingTask(true)}} >{description}</p>
            </div>
            <div className="task-remover">
                {!isNewTask && <img src={trashIcon} className="task-remove-icon" onClick={() => handleDeleteTask(id)} />}
                {(isNewTask && isAddingTask) && <button className="task-add-button" onClick={() => handleAddTask()}>Add</button>}
            </div>
        </div>
    </>
}

export default Task;