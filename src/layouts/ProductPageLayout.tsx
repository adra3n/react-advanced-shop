import React, { useState, useContext } from 'react'
import AppContext from '../context/AppContext'
import Cart from '../components/Cart'
import FiltersSection from '../components/FiltersSection'
import Header from '../components/Header'

type ProductPageLayoutProps = {
  children: any
}

const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({ children }) => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('context error ProductPageLayout')
  }
  const { cart, setCart, products, setFilteredProducts } = context

  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('Old to New')

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
  }

  return (
    <div className="w-screen h-screen ">
      <Header
        handleSearch={handleSearch}
        search={search}
        totalPrice={cart?.totalPrice ?? 0}
      />
      <main className="pt-16 flex flex-row md:ml-[4vw] ml-2">
        {children}
        <Cart cart={cart} setCart={setCart} />
      </main>
    </div>
  )
}

export default ProductPageLayout
