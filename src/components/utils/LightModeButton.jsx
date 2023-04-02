import React from 'react'

export default function LightModeButton({toggleSwitch, isDark}) {
  return (
    <div className={`relative flex items-center w-16 h-6 rounded-full bg-gray-400`}>
    <label
      htmlFor='toggle'
      className={`${
        isDark ? 'bg-[#635FC7]' : 'bg-gray-400'
      } w-16 h-6 flex items-center justify-start rounded-full transition-colors ease-in-out duration-300 cursor-pointer`}
    >
      <div
        className={`${
          isDark ? 'translate-x-10' : 'translate-x-0'
        } w-6 h-6 rounded-full bg-white border border-gray-500 transform transition-transform ease-in-out duration-300`}
      ></div>
    </label>
    <input
      id='toggle'
      type='checkbox'
      checked={isDark}
      onChange={toggleSwitch}
      className='hidden'
    />
  </div>
  )
}
