import React from 'react'

type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-blue-700 text-white w-full rounded text-base font-normal shadow-xl p-1 "
  >
    {children}
  </button>
)

export default Button
