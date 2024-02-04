import React, { useState, useContext } from 'react'
import AppContext from '../context/AppContext'
import Cart from '../components/Cart'
import FiltersSection from '../components/FiltersSection'
import Header from '../components/Header'

type MainShopLayoutProps = {
  children: any
  withFilters: boolean
}

const MainShopLayout: React.FC<MainShopLayoutProps> = ({
  children,
  withFilters,
}) => {
  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('Old to New')
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('context error MainShopLayout')
  }
  const { cart, setCart } = context

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value)
  }

  return (
    <div className="w-screen h-screen bg-gray-200">
      <Header handleSearch={handleSearch} search={search} />
      <main className="pt-16 flex flex-row">
        {withFilters && (
          <FiltersSection
            sortOption={sortOption}
            handleSortChange={handleSortChange}
          />
        )}
        {children}
        <Cart cart={cart} setCart={setCart} />
      </main>
    </div>
  )
}

export default MainShopLayout
