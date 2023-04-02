import React from 'react'

export default function EditBoard({isDark, setShowDeleteWindow, setShowEdit, setShowEditBoard}) {

  const handleShowDelete = () => {
    setShowEdit(false);
    setShowDeleteWindow(true);
  }

  const handleShowEdit = () => {
    setShowEdit(false);
    setShowEditBoard(true)
  }

  return (
    <div className={`absolute ${isDark ? 'bg-[#20212C]' : 'bg-white'} w-[192px] h-[94px] rounded-lg top-[4rem] z-10 flex flex-col items-start justify-center px-4 gap-4 text-sm`}>
        <button onClick={handleShowEdit} className='text-[#828FA3] font-bold'>Edit Board</button>
        <button onClick={handleShowDelete} className='text-[#EA5555] font-bold'>Delete Board</button>
    </div>
  )
}
