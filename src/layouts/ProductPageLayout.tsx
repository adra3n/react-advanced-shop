import React, { useState, useContext, useEffect } from 'react'
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

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
    console.log('search change>>>', newSearch)
  }

  return (
    <div className="w-screen h-screen  ">
      <Header
        handleSearch={handleSearch}
        search={search}
        totalPrice={cart?.totalPrice ?? 0}
      />
      <main className="pt-16 flex md:flex-row flex-col   md:justify-between justify-start lg:px-32 md:px-16 sm:px-8 ">
        {/* <main className="pt-16 flex flex-row md:ml-[4vw] ml-2"> */}
        {children}
        <Cart cart={cart} setCart={setCart} />
      </main>
    </div>
  )
}

export default ProductPageLayout
