import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Task from './Task'
import socket from './config/socket'

export default function Column({name, index, isDark, columns}) {

    const [currentTasks, setCurrentTasks] = useState([])
    const board = useParams()



    useEffect(() => {
        axios
          .get(`https://ju-task-management.herokuapp.com/api/tasks/${name}/${board.id}`)
          .then((response) => {
            setCurrentTasks(response.data.filter((task) => task.parent === board.id && task.status === name));
          })
          .catch((error) => {
            console.log(error);
          });
    
          socket.on('updateTask', tasks => {
            setCurrentTasks(tasks.filter((task) => task.parent === board.id && task.status === name));
          });


    
        return () => {
          socket.off('updateTask');
        };
      }, [board.id, name]);





  return (
    <div className='flex flex-col mt-[2rem] min-w-[350px]'>
        <div className='flex items-center gap-4'>
            <div className={`w-[20px] h-[20px] ${index % 2 ? 'bg-[#8471F2]' : 'bg-[#49C4E5]'} rounded-full`}></div>
            <p className='text-[#828FA3] font-bold tracking-widest text-sm cursor-default'>{name.toUpperCase()} ({currentTasks.length})</p>
        </div>
        <div className='flex flex-col'>
            {currentTasks.map(task => (
                <Task
                    key={task._id}
                    name={task.title}
                    description={task.description}
                    isDark={isDark}
                    subtasks={task.subtasks}
                    status={task.status}
                    columns={columns}
                    setCurrentTasks={setCurrentTasks}
                />
            ))}
        </div>
    </div>
  )
}
