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

  const [brands, setBrands] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
    console.log('search change>>>', newSearch)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('sort change>>>', event.target.value)
    setSortOption(event.target.value)
  }

  const handleBrandFilter = (brands: string[]): void => {
    setBrands(brands)
  }

  const handleModelFilter = (models: string[]): void => {
    setModels(models)
  }

  useEffect(() => {
    let filtered = products
    //filters
    if (brands.length > 0) {
      filtered = filtered.filter((product) => brands.includes(product.brand))
    }
    if (models.length > 0) {
      filtered = filtered.filter((product) => models.includes(product.model))
    }
    if (search.length > 0) {
      const lowcaseSearch = search.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.model.toLocaleLowerCase().includes(lowcaseSearch) ||
          product.brand.toLocaleLowerCase().includes(lowcaseSearch) ||
          product.name.toLocaleLowerCase().includes(lowcaseSearch)
      )
    }

    //sort
    let sorted = [...filtered]
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
    setFilteredProducts(sorted)
    console.log(' filtered>>>', sorted)
  }, [products, brands, models, search, sortOption])

  return (
    <div className="flex flex-1 max-w-screen">
      <Header
        handleSearch={handleSearch}
        search={search}
        totalPrice={cart?.totalPrice ?? 0}
      />
      <main className="pt-16 flex md:flex-row flex-col w-screen  md:justify-between justify-start lg:px-32 md:px-16 sm:px-8">
        <FiltersSection
          sortOption={sortOption}
          handleSortChange={handleSortChange}
          products={products}
          handleBrandFilter={handleBrandFilter}
          handleModelFilter={handleModelFilter}
        />
        <div className="flex flex-1 justify-center"> {children}</div>

        <Cart cart={cart} setCart={setCart} />
      </main>
    </div>
  )
}

export default MainShopLayout
