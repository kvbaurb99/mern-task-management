import React from 'react'
import { BsWindowSidebar } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export default function BoardItem({name, id, setCurrentLocation, currentLocation}) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${id}`);
        setCurrentLocation(`${name}`)
    }

  return (
    <div onClick={handleClick} className={`flex items-center gap-5 ${currentLocation === name ? 'text-white' : 'text-[#828FA3]'} ${currentLocation === name ? 'bg-[#635FC7]' : null} hover:bg-[#635FC7] hover:text-white font-bold cursor-pointer py-4 rounded-tr-full rounded-br-full px-3`}>
    <BsWindowSidebar />
    <p className='text-sm'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
    </div>  
  )
}
