import React from 'react'

export default function AddColumn({addColumn, isDark}) {
  return (
    <button onClick={addColumn} className={`mt-4 text-[#635FC7] font-bold ${isDark ? 'bg-white hover:bg-white/80 active:scale-95' : 'bg-[#635FC7]/10'} py-3 rounded-full text-sm`}>+ Add New Subtask</button>
  )
}
