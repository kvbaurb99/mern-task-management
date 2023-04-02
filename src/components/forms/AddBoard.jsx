import React, { useState } from 'react'
import axios from 'axios'
import Cross from '../utils/Cross'
import { AiOutlineLoading } from 'react-icons/ai'

export default function AddBoard({setShowBoardForm, isDark}) {

  const [boardNameReg, setBoardNameReg] = useState('')
  const [boardColumnsReg, setBoardColumnsReg] = useState([])
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const currentColumn = ''
  const [isLoading, setIsLoading] = useState(false)

  const preventPropagation = (e) => {
    e.stopPropagation()
  }

  const addColumn = (e) => {
    e.preventDefault()
    setBoardColumnsReg([...boardColumnsReg, currentColumn])
  }

  const updateColumn = (index, value) => {
    const updatedColumns = [...boardColumnsReg]
    updatedColumns[index] = value
    setBoardColumnsReg(updatedColumns)
  }

  const removeColumn = (index) => {
    const updatedColumns = boardColumnsReg.filter((_, i) => i !== index)
    setBoardColumnsReg(updatedColumns)
  }


  const createBoard = async (e) => {
    e.preventDefault();
    if (!boardNameReg) {

        setIsError(true);
        setErrorMessage('Can\'t be empty.')

        setTimeout(() => {
          setIsError(false)
          setErrorMessage('')
        }, 3000);


      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('https://ju-task-management.herokuapp.com/newboard', {
        name: boardNameReg,
        columns: boardColumnsReg,
      })

      if (response.data.error) {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(response.data.error)
        setTimeout(() => {
          setIsError(false)
          setErrorMessage('')
        }, 3000);
        return;
      }


      setIsLoading(false);
      setBoardColumnsReg([]);
      setBoardNameReg('');
      setShowBoardForm(false);
      const newBoard = {
        id: response.data.id,
        name: boardNameReg,
        columns: boardColumnsReg,
      };
      const boards = JSON.parse(localStorage.getItem('boards') || '[]');
      boards.push(newBoard);
      localStorage.setItem('boards', JSON.stringify(boards));
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div onClick={() => setShowBoardForm(false)} className={`absolute top-0 left-0 w-full h-screen ${isDark ? 'bg-black/50' : 'bg-[#828FA3]/50'} flex justify-center items-center`}>
        <form onSubmit={createBoard} onClick={preventPropagation} className={`w-[90%] md:w-[480px] h-[429px] ${isDark ? 'bg-[#2B2C37] text-white' : 'bg-white'} rounded p-8 text-sm overflow-y-scroll scrollbar-hide`}>
            <h2 className='text-xl md:text-2xl font-bold cursor-default'>Add New Board</h2>
            <div className='flex flex-col mt-6'>
              <label htmlFor="name" className={`${isDark ? 'text-white' : 'text-[#828FA3]'} font-bold tracking-wide text-xs`}>Board Name</label>
              <input value={boardNameReg} onChange={(e) => setBoardNameReg(e.target.value)} placeholder='e.g. Web Design' type="text" name="name" id="name" className={`border focus:border focus:border-[#635FC7] focus:outline-none ${isError ? 'border-red-600' : null} focus:ring-[#635FC7] border-[#828FA3]/25 py-2 px-2 mt-2 outline-none ${isDark ? 'bg-[#2B2C37]' : null}`} />
              {isError ? <span className='mt-1 text-sm text-red-600'>{errorMessage}</span> : null}
            </div>
            <div className='flex flex-col mt-4'>
              <label className={`${isDark ? 'text-white' : 'text-[#828FA3]'} font-bold tracking-wide text-xs`}>Columns</label>
              {boardColumnsReg.map((column, index) => (
             <div key={index} className='flex items-center w-full'>   
             <input
                key={index}
                value={column}
                onChange={(e) => updateColumn(index, e.target.value)}
                type='text'
                className={`border focus:border focus:border-[#635FC7] focus:outline-none focus:ring-[#635FC7] border-[#828FA3]/25 py-2 px-2 mt-2 outline-none w-[95%] ${isDark ? 'bg-[#2B2C37]' : null}`}
                required
              />
              <Cross onClick={() => removeColumn(index)} />
              </div>
            ))}
              <button onClick={addColumn} className={`mt-4 text-[#635FC7] font-bold ${isDark ? 'bg-white hover:bg-white/80 active:scale-95' : 'bg-[#635FC7]/10'} py-3 rounded-full`}>+ Add New Column</button>
            </div>
            <button className='w-full mx-auto bg-[#635FC7] hover:bg-[#635FC7]/80 active:scale-95 mt-6 py-3 rounded-full text-white font-bold flex justify-center' type="submit">{isLoading ? <AiOutlineLoading className='animate-spin text-lg' /> : 'Create New Board'}</button>
        </form>
    </div>
  )
}
