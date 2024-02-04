// src/pages/App.tsx

import React, { useState } from 'react'
import { products } from './data/example'
import { PaginationItem, CartItem } from './types'
import AppContext from './context/AppContext'
import MainShopLayout from './layouts/MainShopLayout'
import ShopPage from './pages/ShopPage'

const App: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationItem>({
    limit: 12,
    total: products.length,
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
    <AppContext.Provider value={{ pagination, setPagination, cart, setCart }}>
      <MainShopLayout withFilters={true}>
        <ShopPage />
      </MainShopLayout>
    </AppContext.Provider>
  )
}

export default App
