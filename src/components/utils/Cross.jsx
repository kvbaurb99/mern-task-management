import React from 'react'

export default function Cross({onClick}) {
  return (
    <svg onClick={onClick} width="15" height="15" className="ml-4 mt-2 cursor-pointer">
      <g fill="#828FA3" fillRule="evenodd" className='cross'>
        <path
          d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"
        />
        <path
          d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"
        />
      </g>
      <style>{`
        .cross:hover {
          fill: #ea5555;
        }
      `}</style>
    </svg>
  )
}
