import React, { ChangeEvent } from 'react'

type HeaderProps = {
  search: string
  handleSearch: (value: string) => void
}

const Header: React.FC<HeaderProps> = ({ search, handleSearch }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blueBg text-white p-4 flex flex-row justify-between">
      <div className="text-center w-96">
        <h1 className="text-white text-2xl font-bold px-5">Eteration</h1>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="p-2 rounded w-96 text-gray-700"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="flex-1"></div>
    </header>
  )
}

export default Header
