import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditBoard from '../functionals/EditBoard'
import DeleteBoard from '../functionals/DeleteBoard'
import { Link, useParams } from 'react-router-dom'
import EditBoardDetails from '../functionals/EditBoardDetails'
import { BsPlus } from 'react-icons/bs'
import { MdKeyboardArrowDown } from 'react-icons/md'
import LogoMobile from '../utils/LogoMobile'

export default function TopBar({showTaskForm, setShowTaskForm, isDark, name, setAllBoards, setBoardName, columns, setShowMobileMenu}) {

  const [showEdit, setShowEdit] = useState(false)
  const [showDeleteWindow, setShowDeleteWindow] = useState(false)
  const [showEditBoard, setShowEditBoard] = useState(false)
  const deleteDescription = `Are you sure you want to delete the '${name}' board? This action will remove all columns and tasks and cannot be reversed.`;
  const category =  'board';

  const { id } = useParams()

  const showForm = () => {
    setShowTaskForm(!showTaskForm)
  }

  useEffect(() => {
    if (id === undefined) {
      setBoardName('')
    }
  }, [id, setBoardName])



  return (
    <div className={`w-full h-[100px] border-b ${isDark ? 'border-[#3E3F4E]' : 'border-[#E4EBFA]'} flex justify-between p-6 items-center ${isDark ? 'bg-[#2B2C37]' : null}`}>
        <div className='md:block flex items-center gap-3 md:w-auto w-full justify-between'>
            <Link to='/'><LogoMobile /></Link>
            <h2 className={`md:text-3xl text-lg cursor-default font-bold ${isDark ? 'text-white' : null}`}>{name ? name.charAt(0).toUpperCase() + name.slice(1) : ""}</h2>
            <MdKeyboardArrowDown onClick={() => setShowMobileMenu(true)} className='text-[#635FC7] text-2xl md:hidden block relative right-6' />
        </div>
        <div className='flex items-center gap-2 md:gap-5 relative'>
            {id === undefined || !columns || columns.length === 0 ? <button className='bg-[#635FC7]/50 py-3 rounded-3xl text-sm px-6 text-white/50 md:block hidden cursor-not-allowed'>+ Add New Task</button> : <button onClick={showForm} className='bg-[#635FC7] hover:bg-[#635FC7]/80 active:scale-95 py-3 rounded-3xl text-sm px-6 text-white md:block hidden'>+ Add New Task</button>}
            {id === undefined || !columns || columns.length === 0 ?
            <button className='md:hidden flex h-[30px] w-[40px] justify-center items-center bg-[#635FC7]/50 rounded-3xl text-sm cursor-not-allowed'>
              <BsPlus className='text-white text-2xl' />
            </button>
            :
            <button onClick={showForm} className='md:hidden flex h-[30px] w-[40px] justify-center items-center bg-[#635FC7] rounded-3xl text-sm'>
              <BsPlus className='text-white text-2xl' />
            </button>}
            {id === undefined ? <BsThreeDotsVertical className='text-xl text-[#828FA3]/50 cursor-not-allowed' /> : <BsThreeDotsVertical onClick={() => setShowEdit(!showEdit)} className='text-xl text-[#828FA3] cursor-pointer' />}
            {showEdit ? <EditBoard isDark={isDark} setShowEditBoard={setShowEditBoard} setShowDeleteWindow={setShowDeleteWindow} setShowEdit={setShowEdit} /> : null}
        </div>
        {showDeleteWindow ? <DeleteBoard setAllBoards={setAllBoards} isDark={isDark} setShowDeleteWindow={setShowDeleteWindow} name={name} description={deleteDescription} category={category} /> : null}
        {showEditBoard ? <EditBoardDetails isDark={isDark} columns={columns} name={name} setShowEditBoard={setShowEditBoard} setAllBoards={setAllBoards} /> : null}
    </div>
  )
}
