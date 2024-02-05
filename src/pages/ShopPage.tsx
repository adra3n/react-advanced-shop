import { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { CartProductItem, ProductItem } from '../types/types'
import Pagination from '../components/Pagination'
import ProductList from '../components/ProductList'
import { useAddToCart } from '../hooks/useAddToCart'

const ShopPage: React.FC = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('context error ShopPage')
  }
  const { pagination, setPagination, cart, setCart, filteredProducts } = context
  const numberOfPages = Math.ceil(filteredProducts.length / pagination.limit)

  const navigateToPage = (pageNumber: number) => {
    setPagination({
      ...pagination,
      page: pageNumber,
      start: (pageNumber - 1) * pagination.limit,
      perPage: pageNumber * pagination.limit,
    })
  }

  //add to cart hook
  const handleAddToCart = useAddToCart()

  //open page 1 on start
  useEffect(() => {
    navigateToPage(1)
  }, [])

  return (
    <div className="flex flex-col justify-between items-center flex-1 max-w-[1200px]">
      <ProductList handleAddToCart={handleAddToCart} />
      <Pagination
        navigateToPage={navigateToPage}
        pagination={pagination}
        numberOfPages={numberOfPages}
      />
    </div>
  )
}

export default ShopPage
