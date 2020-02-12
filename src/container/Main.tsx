import React, { FunctionComponent, useState } from 'react';
import { ITask, IDirectoryTasks } from '../interfaces';
import Task from '../component/Task';

interface IMainProps {
    initialDirectoryTasks: IDirectoryTasks;
}

// TODO: nanti dihapus
const exampleDirectoryTasks: IDirectoryTasks = {
    2: {
        description: 'coba namanya jgn sama biar gamau nangis',
        isChecked: true,
    },
    1: {
        description: 'ini adalah sebuah task',
        isChecked: false,
    },
    3: {
        description: 'task checked lagi ni',
        isChecked: true,
    },
} 

const Main: FunctionComponent<IMainProps> = ({ initialDirectoryTasks = exampleDirectoryTasks }) => {
    const [directoryTasks, setDirectoryTasks] = useState(initialDirectoryTasks);
    const [latestId, setLatestId] = useState(2);
    
    const addTaskToDirectory = (task: ITask) => {
        const newDirectoryTasks = { ...directoryTasks, ...{ [latestId]: task } }
        setDirectoryTasks(newDirectoryTasks);
        setLatestId(latestId+1)
    }

    const deleteTaskFromDirectory = (id: string) => {
        const newDirectoryTasks = { ...directoryTasks };
        delete newDirectoryTasks[id];

        setDirectoryTasks(newDirectoryTasks as IDirectoryTasks);
    }

    const toggleChecked = (id: string) => {
        const newDirectoryTasks = { ...directoryTasks };
        newDirectoryTasks[id].isChecked = !newDirectoryTasks[id].isChecked;
        setDirectoryTasks(newDirectoryTasks)
    }

    const checkedTasks: IDirectoryTasks = {};
    const uncheckTasks: IDirectoryTasks = {};
    Object.keys(directoryTasks).map((id: string) => {
        if(directoryTasks[id].isChecked) {
            checkedTasks[id] = directoryTasks[id];
        } else {
            uncheckTasks[id] = directoryTasks[id];
        }
    })
    

    return <>
        <h2 className="header">Todos</h2>
        {Object.keys(uncheckTasks).map((id: string) => {
            const { description, isChecked } = uncheckTasks[id];
            return (<Task key={id} id={id} description={description} isChecked={isChecked} isNewTask={false} toggleChecked={toggleChecked} addTaskToDirectory={addTaskToDirectory} deleteTaskFromDirectory={deleteTaskFromDirectory} />)
        })}
        {Object.keys(checkedTasks).map((id: string) => {
            const { description, isChecked } = checkedTasks[id];
            return (<Task key={id} id={id} description={description} isChecked={isChecked} isNewTask={false} toggleChecked={toggleChecked} addTaskToDirectory={addTaskToDirectory} deleteTaskFromDirectory={deleteTaskFromDirectory} />)
        })}
        <Task isNewTask={true} id='0' isChecked={false} description="Add New Task" toggleChecked={toggleChecked} addTaskToDirectory={addTaskToDirectory} deleteTaskFromDirectory={deleteTaskFromDirectory} />
    </>
}

export default Main;