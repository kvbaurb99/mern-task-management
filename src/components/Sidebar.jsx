import React from 'react'
import Boards from './board_elements/Boards'
import LightMode from './functionals/LightMode'
import Logo from './utils/Logo'
import { Link } from 'react-router-dom'

export default function Sidebar({showBoardForm, setShowBoardForm, isDark, setIsDark, allBoards}) {




  return (
    <div className={`min-w-[300px] md:flex h-screen border-r ${isDark ? 'border-[#3E3F4E]' : 'border-[#E4EBFA]'} p-6 hidden sidebar flex-col justify-between ${isDark ? 'bg-[#2B2C37]' : null} `}>
        <div className='flex flex-col'>
        <Link to='/'><Logo isDark={isDark} /></Link>
        <Boards setShowBoardForm={setShowBoardForm} showBoardForm={showBoardForm} allBoards={allBoards} />
        </div>
        <div className='flex flex-col'>
          <LightMode isDark={isDark} setIsDark={setIsDark} />
          {/*<HideSidebar setIsHidden={setIsHidden} isHidden={isHidden} />*/}
        </div>
    </div>
  )
}
