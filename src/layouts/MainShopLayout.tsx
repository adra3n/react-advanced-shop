import React, { useState, useContext, useMemo, useEffect } from 'react'
import AppContext from '../context/AppContext'
import Cart from '../components/Cart'
import FiltersSection from '../components/FiltersSection'
import Header from '../components/Header'

type MainShopLayoutProps = {
  children: any
}

const MainShopLayout: React.FC<MainShopLayoutProps> = ({ children }) => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('context error MainShopLayout')
  }
  const { cart, setCart, products, setFilteredProducts } = context

  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('Old to New')

  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value)
  }

  const handleBrandFilter = (brand: string): void => {
    setBrand(brand)
  }

  const handleModelFilter = (model: string): void => {
    setModel(model)
  }

  const filteredSortedProducts = useMemo(() => {
    let filtered = products
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand)
    }
    if (model) {
      filtered = filtered.filter((product) => product.model === model)
    }
    if (search.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.model === search ||
          product.brand === search ||
          product.name === search
      )
    }
    let sorted = [...filtered]
    console.log('filtered>>>', filtered)
    switch (sortOption) {
      case 'Old to New':
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        break
      case 'New to Old':
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case 'Price High to Low':
        sorted.sort((a, b) => +b.price - +a.price)
        break
      case 'Price Low to High':
        sorted.sort((a, b) => +a.price - +b.price)
        break
      default:
        break
    }

    return sorted
  }, [products, brand, model])

  useEffect(() => {
    setFilteredProducts(filteredSortedProducts)
  }, [filteredSortedProducts])

  return (
    <div className="w-screen h-screen ">
      <Header
        handleSearch={handleSearch}
        search={search}
        totalPrice={cart?.totalPrice ?? 0}
      />
      <main className="pt-16 flex flex-row">
        <FiltersSection
          sortOption={sortOption}
          handleSortChange={handleSortChange}
          products={products}
          handleBrandFilter={handleBrandFilter}
          handleModelFilter={handleModelFilter}
        />

        {children}
        <Cart cart={cart} setCart={setCart} />
      </main>
    </div>
  )
}

export default MainShopLayout
