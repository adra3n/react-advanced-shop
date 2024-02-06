import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import axios from 'axios'

import AppContext from './context/AppContext'

import ProductPageLayout from './layouts/ProductPageLayout'
import MainShopLayout from './layouts/MainShopLayout'
import ShopPage from './pages/ShopPage'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'

import { PaginationItem, CartItem, ProductItem } from './types/types'

const App: React.FC = () => {
  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL ??
    'https://5fc9346b2af77700165ae514.mockapi.io'

  const [products, setProducts] = useState<ProductItem[]>([])
  const [filteredProducts, setFilteredProducts] =
    useState<ProductItem[]>(products)
  const [pagination, setPagination] = useState<PaginationItem>({
    limit: 12,
    total: filteredProducts.length,
    start: 0,
    page: 1,
    perPage: 12,
  })
  const [cart, setCart] = useState<CartItem>(() => {
    //chck cart from local storage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      console.log('got cart saved on localstr')
      return JSON.parse(savedCart)
    } else {
      return { totalPrice: 0, products: [] }
    }
  })

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/products`)
      setProducts(response.data)

      console.log('fetched products>>>', products)
    } catch (error) {
      console.error('fetch error products>>>', error)
    }
  }

  //getproducts on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  //update filteredProducts if products change
  useEffect(() => {
    setFilteredProducts(products)
    // console.log('updated filteredProducts>>>', filteredProducts)
  }, [products])

  //update cart on localstorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log('cart>>>', cart)
  }, [cart])

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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainShopLayout>
                <ShopPage />
              </MainShopLayout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductPageLayout>
                <ProductDetails />
              </ProductPageLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
