import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import axios from 'axios'
import EditTask from './functionals/EditTask'
import { useParams } from 'react-router-dom'

export default function TaskDetails({isDark, description, title, setShowDetails, subtasks, status, columns, setShowDeleteWindow, setShowTaskEdit}) {

    const [showEdit, setShowEdit] = useState(false)
    const { id } = useParams()


    const preventPropagation = (e) => {
        e.stopPropagation()
    }

    const updateStatus = async (name, completed) => {
        try {
            await axios.post(`https://ju-task-management.herokuapp.com/updateTaskStatus/${id}/${name}/${title}`, {
            status: completed,
          });
        } catch (err) {
          console.log(err);
        }
      };


  return (
    <>
    <div onClick={() => setShowDetails(false)} className={`w-full absolute ${isDark ? 'bg-black/50' :'bg-[#828FA3]/50'} top-0 left-0 h-full flex justify-center items-center`}>
        <div onClick={preventPropagation} className={`${isDark ? 'bg-[#2B2C37] text-white' : 'bg-white'} w-[90%] md:w-[480px] h-auto rounded p-8`}>
            <div className='flex w-full justify-between items-center relative'>
                <p className='text-xl font-bold w-[80%] break-words'>{title.charAt(0).toUpperCase() + title.slice(1)}</p>
                <BsThreeDotsVertical onClick={() => setShowEdit(!showEdit)} className='text-[#828FA3] text-xl cursor-pointer' />
                {showEdit ? <EditTask isDark={isDark} setShowEdit={setShowEdit} showEdit={showEdit} setShowDetails={setShowDetails} setShowDeleteWindow={setShowDeleteWindow} setShowTaskEdit={setShowTaskEdit} /> : null}
            </div>
            <p className={`mt-6 text-sm text-[#828FA3] w-full break-words`}>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <p className={`mt-6 text-xs font-bold ${isDark ? 'text-white' : 'text-[#828FA3]'}`}> Subtasks ({subtasks.filter(subtask => subtask.completed).length} of {subtasks.length})</p>
            <div className='flex flex-col'>
                {subtasks.map((subtask, index) => (
                    <div key={index} className={`${isDark ? 'bg-[#20212C]' : 'bg-white'} py-3 mt-4 rounded-lg h-auto ${subtask.completed ? 'line-through text-[#828FA3]' : null}`}>
                    <input
                        key={index} 
                        type="checkbox" 
                        className={`ml-4 ${isDark ? 'bg-[#2B2C37]' : 'bg-white'} focus:border ${isDark ? 'border-[#828FA3]/20' : 'border-[#828FA3]/50'} rounded-sm focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7] checked:bg-[#635FC7]`} 
                        name={subtask.name}
                        checked={subtask.completed} 
                        id={subtask.name}
                        onChange={() => updateStatus(subtask.name, !subtask.completed)}
                    />
                        <label htmlFor={subtask.name} className='ml-4 text-sm'>{subtask.name.charAt(0).toUpperCase() + subtask.name.slice(1)}</label>
                    </div>
                ))}
            </div>
            <p className='mt-4 text-xs font-bold'>Current Status</p>
            <select className={`w-full ${isDark ? 'bg-[#2B2C37]' : 'bg-white'} border border-[#828FA3]/25 outline-none mt-2`}>
                {columns.map(column => (
                <option key={column} value={column} selected={column === status ? column : null} defaultValue={column === status}>{column.charAt(0).toUpperCase() + column.slice(1)}</option>
                ))}
            </select>
        </div>
    </div>
    </>
  )
}
