import React from 'react'
import useTLFormat from '../hooks/useTLFormat'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faBriefcase,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
type HeaderProps = {
  search: string
  handleSearch: (value: string) => void
  totalPrice: number
}

const user = 'Sertaç'

const Header: React.FC<HeaderProps> = ({
  search,
  handleSearch,
  totalPrice,
}) => {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 right-0 bg-blueBg text-white py-4 flex flex-row justify-between items-center w-full  lg:px-32 md:px-16 sm:px-8">
      <div
        className="text-left w-1/5 md:ml-[1vw] ml-4 cursor-pointer  md:text-2xl text-xl "
        onClick={() => {
          navigate(`/`)
        }}
      >
        <h1 className="text-white font-bold ">Eteration</h1>
      </div>
      <div className="relative flex md:max-w-[350px] max-w-36 ">
        <input
          type="text"
          placeholder="Search"
          className="pl-10 p-2 rounded text-blue-800 ml-2 md:w-full md:max-w-[350px] max-w-36 placeholder-blue-800"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-blue-500"
        />
      </div>

      <div className="flex flex-row md:mr-0 pr-1 gap-3 md:w-72 justify-end">
        <div className=" flex justify-end items-center md:gap-2 ml-1  md:flex-row flex-col">
          <FontAwesomeIcon icon={faBriefcase} />
          <div>{useTLFormat(totalPrice)}₺</div>
        </div>
        <div className="flex justify-end items-center md:gap-2 md:ml-8 md:mr-1 md:flex-row flex-col">
          <FontAwesomeIcon icon={faUser} />
          <p>{user}</p>
        </div>
      </div>
    </header>
  )
}

export default Header
