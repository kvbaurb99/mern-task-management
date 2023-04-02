import React, { useState } from 'react'
import axios from 'axios'
import BoardScreen from '../board_elements/BoardScreen'
import AddBoard from '../forms/AddBoard'
import AddTask from '../forms/AddTask'
import Sidebar from '../Sidebar'
import TopBar from '../board_elements/TopBar'
import { useEffect } from 'react'
import socket from '../config/socket'
import { useParams } from 'react-router-dom'
import MobileMenu from '../functionals/MobileMenu'

export default function Board() {

  const [showTaskForm, setShowTaskForm] = useState(false)

  const [showBoardForm, setShowBoardForm] = useState(false)

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const [allBoards, setAllBoards] = useState([])

  const board = useParams()

  const [columns, setColumns] = useState()

  const [boardName, setBoardName] = useState('')

  const [isDark, setIsDark] = useState(() => {
    const savedIsDark = localStorage.getItem('isDark');
    return savedIsDark === 'true';
  });



  useEffect(() => {
    const getCurrentBoard = async () => {
      if (board.id === undefined) {
        return;
      }
      try {
        const response = await axios.get(`https://ju-task-management.herokuapp.com/api/boards/${board.id}`);
        setColumns(response.data.columns)
        setBoardName(response.data.name)
      } catch (err) {
        console.log(err);
      }
    }

    getCurrentBoard()

    socket.on('boardUpdated', () => {
      getCurrentBoard()
    })


    return () => {
      socket.off('boardUpdated');
    }

  }, [board.id])

  // Getting all boards with Socket.io
  useEffect(() => {
      axios.get('https://ju-task-management.herokuapp.com/api/boards')
        .then(response => {
          setAllBoards(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      socket.on('boardUpdated', boards => {
        setAllBoards(boards)
      })
      
  
      return () => {
        socket.off('boardUpdated');
      };
    }, [board.id]);


  return (
    <div className='h-screen w-full flex md:overflow-y-hidden'>
        <Sidebar showBoardForm={showBoardForm} setShowBoardForm={setShowBoardForm} isDark={isDark} setIsDark={setIsDark} allBoards={allBoards} />
        <div className='flex flex-col w-full'>
        <TopBar setShowTaskForm={setShowTaskForm} showTaskForm={showTaskForm} isDark={isDark} allBoards={allBoards} name={boardName} setAllBoards={setAllBoards} setBoardName={setBoardName} columns={columns} setShowMobileMenu={setShowMobileMenu} />
        <BoardScreen allBoards={allBoards} isDark={isDark} columns={columns} setColumns={setColumns} setShowBoardForm={setShowBoardForm} />
        </div>
        {showTaskForm ? <AddTask setShowTaskForm={setShowTaskForm} isDark={isDark} columns={columns} /> : null}
        {showBoardForm ? <AddBoard setShowBoardForm={setShowBoardForm} isDark={isDark} /> : null}
        {showMobileMenu ? <MobileMenu isDark={isDark} allBoards={allBoards} setIsDark={setIsDark} setShowMobileMenu={setShowMobileMenu} setShowBoardForm={setShowBoardForm} /> : null}
    </div>
  )
}
