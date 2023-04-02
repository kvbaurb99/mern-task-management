import React, { useState } from 'react'
import AddColumn from '../utils/AddColumn'
import Cross from '../utils/Cross'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function EditTaskDetails({isDark, title, description, setShowTaskEdit, subtasks, columns, status}) {

    const [currentTitle, setCurrentTitle] = useState(title)
    const [currentDescription, setCurrentDescription] = useState(description)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [subtasksReg, setSubtasksReg] = useState(subtasks)
    const [currentStatus, setCurrentStatus] = useState(status)
    const { id } = useParams()

    const preventPropagation = (e) => {
        e.stopPropagation()
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.post(`https://ju-task-management.herokuapp.com/updatetask/${id}/${title}`, {
            name: currentTitle,
            description: currentDescription,
            subtasks: subtasksReg,
            status: currentStatus
          });

          if (response.data.error) {
            setIsError(true)
            setErrorMessage(response.data.error)
            setErrorCategory(response.data.category)

            setTimeout(() => {
              setIsError(false)
              setErrorMessage('')
            }, 3000);

            return;
          }
          setShowTaskEdit(false)
        } catch (err) {
          console.log(err);
        }
      };

    const addColumn = (e) => {
      e.preventDefault();
      const newSubtask = {
        name: "",
        completed: false
      };
      setSubtasksReg([...subtasksReg, newSubtask]);
      };
        
      const updateColumn = (index, value) => {
        const updatedSubtasks = [...subtasksReg];
        updatedSubtasks[index] = {
          ...updatedSubtasks[index],
          name: value,
        };
        setSubtasksReg(updatedSubtasks);
      };
        
      const removeColumn = (index) => {
        const updatedSubtask = subtasksReg.filter((_, i) => i !== index)
        setSubtasksReg(updatedSubtask)
      };

  return (
    <div onClick={() => setShowTaskEdit(false)} className={`flex absolute top-0 left-0 w-full h-full ${isDark ? 'bg-black/60' : 'bg-[#828FA3]/50'} justify-center items-center`}>
        <div onClick={preventPropagation} className={`w-[90%] md:w-[480px] h-[675px] ${isDark ? 'bg-[#2B2C37] text-white' : 'bg-white'} rounded p-6 overflow-y-scroll scrollbar-hide text-sm`}>
            <h2 className='text-xl'>Edit Task</h2>
            <div className='flex flex-col mt-6'>

                <label htmlFor="title">Title</label>
                <input onChange={(e) => setCurrentTitle(e.target.value)} value={currentTitle} type="text" name="title" id="title" className={`border ${isError && errorCategory === 'title' ? 'border-red-600' : null} border-[#828FA3]/25 py-2 focus:border focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7] px-2 mt-2 outline-none ${isDark ? 'bg-[#2B2C37]' : null}`} />
                {isError && errorCategory === 'title' ? <span className='mt-1 text-red-600 text-sm'>{errorMessage}</span> : null}

                <label htmlFor="description" className='mt-6'>Description</label>
                <textarea onChange={(e) => setCurrentDescription(e.target.value)} value={currentDescription} name="description" id="description" cols="30" rows="4" className={`border border-[#828FA3]/25 py-2 px-2 mt-2 resize-none focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7] focus:border outline-none ${isDark ? 'bg-[#2B2C37]' : null}`}></textarea>

                <label className='mt-6'>Subtasks</label>
                {subtasksReg.map((subtask, index) => (
                    <div key={index} className='flex items-center w-full'>   
                        <input
                        key={index}
                        value={subtask.name}
                        onChange={(e) => updateColumn(index, e.target.value)}
                        type='text'
                        className={`border- focus:border focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7] ${isDark ? 'border-[#828FA3]/25' : 'bg-white border-[#828FA3]/25'} py-2 px-2 mt-2 outline-none w-[95%] ${isError && errorCategory === 'subtask' && subtask.name === '' ? 'border-red-600' : null} rounded ${isDark ? 'bg-[#2B2C37]' : null}`}
                        required
                        />
                        <Cross onClick={() => removeColumn(index)} />
                    </div> 
                ))}
                {isError && errorCategory === 'subtask' ? <span className='mt-1 text-red-600 text-sm'>{errorMessage}</span> : null}
                <AddColumn isDark={isDark} addColumn={addColumn} />
                <label htmlFor="status" className='mt-4'>Status</label>
                <select onChange={(e) => setCurrentStatus(e.target.value)} name="status" id="status" className={`border border-[#828FA3]/25 py-2 px-2 mt-2 outline-none ${isDark ? 'bg-[#2B2C37] focus:border focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7]' : null}`}>
                {columns.map(column => (
                    <option selected={column === currentStatus ? currentStatus : null} key={column} value={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</option>
                ))}
                </select>
                <button onClick={handleSaveChanges} className='w-full bg-[#635FC7] hover:bg-[#635FC7]/80 active:scale-95 py-3 rounded-full mt-6 text-white text-sm'>Save Changes</button>
            </div>
        </div>
    </div>
  )
}
