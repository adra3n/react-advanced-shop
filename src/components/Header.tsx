import React, { ChangeEvent } from 'react'

type HeaderProps = {
  search: string
  handleSearch: (value: string) => void
  totalPrice: number
}

const Header: React.FC<HeaderProps> = ({
  search,
  handleSearch,
  totalPrice,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blueBg text-white py-4 flex flex-row justify-between items-center gap-5 w-full">
      <div className="text-left md:w-56 w-36 md:ml-[4vw] ml-4">
        <h1 className="text-white text-2xl font-bold md:px-5">Eteration</h1>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="p-2 rounded md:w-96 text-gray-700"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="flex-1 flex gap-5 flex-row justify-end mr-[5vw]">
        <div>{totalPrice}</div>
      </div>
      <div className="flex-2 flex gap-5 flex-row justify-end mr-[5vw]">
        <div>{totalPrice}</div>
      </div>
    </header>
  )
}

export default Header
