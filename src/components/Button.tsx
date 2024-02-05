import React from 'react'

type ButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-blueBg text-white w-full rounded text-base font-normal shadow-xl p-1 hover:bg-blue-300  "
  >
    {children}
  </button>
)

export default Button
