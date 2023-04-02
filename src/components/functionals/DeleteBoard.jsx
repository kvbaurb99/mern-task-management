import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import socket from '../config/socket'
import { useNavigate } from 'react-router-dom'

export default function DeleteBoard({isDark, setShowDeleteWindow, name, setAllBoards, description, category}) {

    const { id } = useParams()
    const navigate = useNavigate()

    // deleting the board
    const handleDeleteBoard = async () => {
        try {
          const request = await axios.post(`http://localhost:3001/deleteboard/${id}`);
          const boards = request.data; // Assuming that the server sends back the updated list of boards
          socket.emit('board-deleted', boards, () => {
            setAllBoards(boards);
          });
          setShowDeleteWindow(false)
          navigate('/')

        } catch (err) {
          console.log(err);
        }
      };


    // deleting a task
    const handleDeleteTask = async () => {
        try {
            const request = await axios.post(`https://ju-task-management.herokuapp.com/deletetask/${name}/${id}`);
            setShowDeleteWindow(false)
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className={`absolute top-0 left-0 w-full h-full ${isDark ? 'bg-black/50' : 'bg-[#828FA3]/50'} flex justify-center items-center`}>
        <div className={`w-[480px] h-[229px] rounded-lg ${isDark ? 'bg-[#2B2C37]' : 'bg-white'} p-6`}>
            <h3 className='text-[#EA5555] font-bold text-xl'>Delete this {category} ?</h3>
            <p className='text-sm mt-5 text-[#828FA3]'>{description}</p>
            <div className='flex w-full justify-between mt-8'>
                { category === 'board' ? <button onClick={handleDeleteBoard} className='w-[46%] bg-[#EA5555] hover:bg-[#EA5555]/80 active:scale-95 text-white py-2 rounded-full text-sm font-bold'>Delete</button> : <button onClick={handleDeleteTask} className='w-[46%] bg-[#EA5555] hover:bg-[#EA5555]/80 active:scale-95 text-white py-2 rounded-full text-sm font-bold'>Delete</button>}
                <button onClick={() => setShowDeleteWindow(false)} className={` ${isDark ? 'bg-white' : 'bg-gray-200'} w-[46%]  active:scale-95 ${isDark ? 'hover:bg-white/80' : 'hover:bg-gray-200/80'} text-[#635FC7] py-2 rounded-full text-sm font-bold`}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
