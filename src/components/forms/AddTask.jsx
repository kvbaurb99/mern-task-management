import React, { useState } from 'react'
import axios from 'axios';
import Cross from '../utils/Cross';
import { useParams } from 'react-router-dom';
import AddColumn from '../utils/AddColumn';

export default function AddTask({setShowTaskForm, columns, isDark}) {

    const [titleReg, setTitleReg] = useState('')
    const [descriptionReg, setDescriptionReg] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [subtasksReg, setSubtasksReg] = useState([])
    const [statusReg, setStatusReg] = useState(columns[0])


    const board = useParams()

    const preventPropagation = (e) => {
        e.stopPropagation();
    }

    const addColumn = (e) => {
        e.preventDefault();
        const newSubtask = {
          name: "",
          completed: false
        };
        setSubtasksReg([...subtasksReg, newSubtask]);
      };
    
      const updateColumn = (index, nameValue) => {
        const updatedSubtasks = [...subtasksReg];
        updatedSubtasks[index] = {
          ...updatedSubtasks[index],
          name: nameValue
        };
        setSubtasksReg(updatedSubtasks);
      };
    
      const removeColumn = (index) => {
        const updatedSubtask = subtasksReg.filter((_, i) => i !== index)
        setSubtasksReg(updatedSubtask)
      }

      const addTask = async (e) => {
        e.preventDefault();

        // authentication
        if (!titleReg) {

            setErrorCategory('title')
            setIsError(true);
            setErrorMessage('Can\'t be empty.');

            setTimeout(() => {
              setIsError(false);
              setErrorMessage('')
            }, 3000);
          
            return;
          }


        try {
          const response = await axios.post('https://ju-task-management.herokuapp.com/newTask', {
            title: titleReg,
            description: descriptionReg,
            subtasks: subtasksReg,
            status: statusReg,
            parent: board.id
          });
      
          if (response.data.error) {
            setIsError(true);
            setErrorCategory(response.data.category)
            setErrorMessage(response.data.error)
            setTimeout(() => {
              setIsError(false);
              setErrorMessage('')
              setErrorCategory('')
            }, 3000);
            return;
          }
      
          setDescriptionReg('')
          setTitleReg('')
          setSubtasksReg([])
          setShowTaskForm(false)
      
          const newTask = {
            parent: response.data.id,
            title: titleReg,
            description: descriptionReg,
            subtasks: subtasksReg,
            status: statusReg,
          }
      
          const tasks = JSON.parse(localStorage.getItem('tasks') || [])
          tasks.push(newTask)
          localStorage.setItem('tasks', JSON.stringify(tasks))
        } catch (err) {
          console.log(err)
        }
      }


  return (
    <div onClick={() => setShowTaskForm(false)} className={`absolute top-0 left-0 w-full h-screen ${isDark ? 'bg-black/50' : 'bg-[#828FA3]/50'} flex justify-center items-center`}>
        <form onSubmit={addTask} onClick={preventPropagation} className={`w-[90%] md:w-[480px] h-[600px] md:h-[675px] ${isDark ? 'bg-[#2B2C37] text-white' : 'bg-white'} rounded p-8 text-sm overflow-y-scroll scrollbar-hide`}>
            <h2 className='font-bold text-xl md:text-2xl cursor-default'>Add New Task</h2>
            <div className='flex flex-col mt-6'>
                <label htmlFor="title" className={`${isDark ? 'text-white' : 'text-[#828FA3]'} font-bold tracking-wide text-xs`}>Title</label>
                <input onChange={(e) => setTitleReg(e.target.value)} placeholder='e.g. Take coffee break' type="text" name="title" id="title" className={`border border-[#828FA3]/25 py-2 px-2 mt-2 text-sm md:text-base ${isError && errorCategory === 'title' ? 'border-red-600' : null} outline-none ${isDark ? 'bg-[#2B2C37] focus:border focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7]' : null}`} />
                {isError && errorCategory === 'title' ? <span className='text-sm mt-1 text-red-600'>{errorMessage}</span> : null}
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="description" className={`${isDark ? 'text-white' : 'text-[#828FA3]'} font-bold tracking-wide text-xs`}>Description</label>
                <textarea onChange={(e) => setDescriptionReg(e.target.value)} placeholder='e.g. Its always good to take a break. This 15 minute break will recharge the batteries a little.' name="description" id="description" cols="30" rows="5" className={`border focus:border ${isError && errorCategory === 'description' ? 'border-red-600' : null} focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7] border-[#828FA3]/25 px-2 resize-none py-2 text-sm md:text-base mt-2 outline-none ${isDark ? 'bg-[#2B2C37]' : null}`}></textarea>
                {isError && errorCategory === 'description' ? <span className='text-sm mt-1 text-red-600'>{errorMessage}</span> : null}
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="subtasks" className={`${isDark ? 'text-white' : 'text-[#828FA3]'} font-bold tracking-wide text-xs`}>Subtasks</label>
                {subtasksReg.map((subtask, index) => (
                    <div key={index} className='flex w-full items-center'>
                    <input placeholder='e.g. Drink coffee & smile' type="text" className={`w-[95%] border text-sm md:text-base border-[#828FA3]/25 py-2 px-2 mt-2 outline-none focus:border focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7] ${isDark ? 'bg-[#2B2C37]' : null}`}
                        key={index}
                        value={subtask.name}
                        onChange={(e) => updateColumn(index, e.target.value)}
                    />
                    <Cross onClick={() => removeColumn(index)} />
                    </div>
                ))}
                {isError && errorCategory === "subtask" ? <span className='mt-1 text-red-600 text-sm'>{errorMessage}</span> : null}
                <AddColumn addColumn={addColumn} isDark={isDark} />
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="status" className='text-[#828FA3] font-bold tracking-wide text-xs'>Status</label>
                <select onChange={(e) => setStatusReg(e.target.value)} name="status" id="status" className={`py-2 ${isDark ? 'bg-[#2B2C37]' : null} border border-[#828FA3]/25 px-2 mt-2 outline-none font-bold text-sm md:text-base focus:border focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7]`}>
                    {columns.map(column => (
                        <option key={column} value={column}>{column}</option>
                    ))}
                </select>
            </div>
            <button type='submit' className='w-full mx-auto bg-[#635FC7] hover:bg-[#635FC7]/80 active:scale-95 mt-6 py-3 rounded-3xl text-sm text-white font-bold'>Create Task</button>
        </form>
    </div>
  )
}
