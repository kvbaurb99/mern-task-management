import React from 'react'
import { BsWindowSidebar } from 'react-icons/bs'
import LightMode from './LightMode'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function MobileMenu({isDark, allBoards, setIsDark, setShowMobileMenu, setShowBoardForm}) {

    const [currentLocation, setCurrentLocation] = useState('')
    
    const { id } = useParams()

    const navigate = useNavigate()

    const handleClick = (name, id) => {
        navigate(`/${id}`);
        setCurrentLocation(`${name}`)
    }

    const openBoardForm = () => {
        setShowMobileMenu(false)
        setShowBoardForm(true)
    }
    
    const preventPropagation = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        if (id === undefined) {
            setCurrentLocation('')
        }
    }, [id])

  return (
    <div onClick={() => setShowMobileMenu(false)} className={`absolute top-0 left-0 w-full h-full ${isDark ? 'bg-black/50' : 'bg-[#828FA3]/50'} flex md:hidden justify-center items-start`}>
        <div onClick={preventPropagation} className={`w-[264px] h-[322px] ${isDark ? 'bg-[#2B2C37]' : 'bg-white'} relative top-[8rem] rounded flex flex-col justify-between`}>
            <div>
                <p className='text-[#828FA3] text-xs tracking-wider font-bold p-4'>ALL BOARDS ({allBoards.length})</p>
                <div className='mt-1 overflow-y-scroll scrollbar-hide'>
                {allBoards.map(board => (
                    <div key={board.name} onClick={() => handleClick(board.name, board._id)} className={`flex ${currentLocation === board.name ? 'text-white' : 'text-[#828FA3]'} ${currentLocation === board.name ? 'bg-[#635FC7]' : null} items-center gap-5 px-4 py-3 w-[90%]  rounded-tr-full rounded-br-full hover:bg-[#635FC7] text-[#828FA3] font-bold`}>
                        <BsWindowSidebar />
                        <p className='text-sm'>{board.name}</p>
                    </div>
                ))}
                <div onClick={openBoardForm} className='flex w-[90%] items-center gap-5 hover:bg-[#635FC7] hover:text-white font-bold cursor-pointer py-3 rounded-tr-full rounded-br-full px-4 text-[#635FC7]'>
                    <BsWindowSidebar />
                    <p className='text-sm font-bold'>+ Create New Board</p>
                </div>
            </div>    
            </div>
            <LightMode isDark={isDark} setIsDark={setIsDark} />
        </div>
    </div>
  )
}
