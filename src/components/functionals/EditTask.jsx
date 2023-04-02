import React from 'react'

export default function EditTask({setShowEdit, isDark, setShowDetails, setShowDeleteWindow, setShowTaskEdit}) {

    const handleShowDelete = () => {
        setShowDeleteWindow(true);
        setShowDetails(false)
        setShowEdit(false)
    }

    const handleShowEdit = () => {
      setShowDetails(false);
      setShowEdit(false);
      setShowTaskEdit(true)
    }

  return (
    <div className={` ${isDark ? 'bg-[#20212C]' : 'bg-white'} absolute  w-[192px] h-[94px] rounded-lg top-10 right-[-2rem] md:right-[-6rem] z-10 flex flex-col items-start justify-center px-4 gap-4 text-sm`}>
        <button onClick={handleShowEdit} className='text-[#828FA3] font-bold'>Edit Task</button>
        <button onClick={handleShowDelete} className='text-[#EA5555] font-bold'>Delete Task</button>
    </div>
  )
}
