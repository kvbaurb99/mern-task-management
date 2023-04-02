import React, { useState } from 'react'
import TaskDetails from './TaskDetails'
import DeleteBoard from './functionals/DeleteBoard'
import EditTaskDetails from './functionals/EditTaskDetails'

export default function Task({name, isDark, subtasks, description, status, columns, setCurrentTask}) {

    const [showDetails, setShowDetails] = useState(false)
    const [showTaskEdit, setShowTaskEdit] = useState(false)
    const [hoverColor, setHoverColor] = useState(false)
    const [showDeleteWindow, setShowDeleteWindow] = useState(false)
    const deleteDescription = `Are you sure you want to delete the ${name} task and its subtasks? This action cannot be reversed.`;
    const category = 'task';
  return (
    <>
    <div onMouseOver={() => setHoverColor(true)} onMouseOut={() => setHoverColor(false)} onClick={() => setShowDetails(true)} className={`w-[340px] break-words h-full mt-[35px] ${isDark ? 'bg-[#2B2C37] text-white shadow-gray-800' : 'bg-white'} rounded-lg shadow-md shadow-[#828FA3] py-6 px-5 flex flex-col justify-center cursor-pointer`}>
        <h3 className={`font-bold text-xl ${hoverColor ? 'text-[#635FC7]' : null}`}>{name}</h3>
        <p className='text-xs text-[#828FA3] font-bold mt-2'>{subtasks.filter(subtask => subtask.completed).length} of {subtasks.length} {subtasks.length === 1 ? 'subtask' : 'subtasks'}</p>
    </div>
    {showDetails ? <TaskDetails isDark={isDark} title={name} description={description} setShowDetails={setShowDetails} showDetails={showDetails} subtasks={subtasks} status={status} columns={columns} setShowDeleteWindow={setShowDeleteWindow} setShowTaskEdit={setShowTaskEdit}  /> : null}
    {showDeleteWindow ? <DeleteBoard isDark={isDark} name={name} description={deleteDescription} setShowDeleteWindow={setShowDeleteWindow} category={category} /> : null}
    {showTaskEdit ? <EditTaskDetails isDark={isDark} title={name} description={description} setShowTaskEdit={setShowTaskEdit} subtasks={subtasks} columns={columns} status={status} setCurrentTask={setCurrentTask} /> : null}
    </>
  )
}
