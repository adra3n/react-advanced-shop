// src/pages/App.tsx

import React, { useState } from 'react'
import { products } from './data/example'
import { PaginationItem, CartItem, ProductItem } from './types/types'
import AppContext from './context/AppContext'
import MainShopLayout from './layouts/MainShopLayout'
import ShopPage from './pages/ShopPage'

const initialProducts = [...products]

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] =
    useState<ProductItem[]>(initialProducts)
  const [pagination, setPagination] = useState<PaginationItem>({
    limit: 12,
    total: filteredProducts.length,
    start: 0,
    page: 1,
    perPage: 12,
  })
  const [cart, setCart] = useState<CartItem>(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      return JSON.parse(savedCart)
    } else {
      return { totalPrice: 0, products: [] }
    }
  })

  return (
    <AppContext.Provider
      value={{
        pagination,
        setPagination,
        cart,
        setCart,
        products,
        filteredProducts,
        setFilteredProducts,
      }}
    >
      <MainShopLayout withFilters={true}>
        <ShopPage />
      </MainShopLayout>
    </AppContext.Provider>
  )
}

export default App
