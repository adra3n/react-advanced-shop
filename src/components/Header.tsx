import React, { ChangeEvent } from 'react'
import useTLFormat from '../hooks/useTLFormat'

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
      <div className=" flex flex-1">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded text-gray-700 md:w-96 w-56 ml-5 "
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-row md:mr-[5vw] mr-2  md:w-72 w-40">
        <div className="flex-1 flex justify-end ">
          <div>{useTLFormat(totalPrice)} ₺</div>
        </div>
        <div className="flex justify-end ">
          <div>{useTLFormat(totalPrice)} ₺</div>
        </div>
      </div>
    </header>
  )
}

export default Header
