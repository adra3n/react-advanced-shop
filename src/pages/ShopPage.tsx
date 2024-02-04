import { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { products } from '../data/example'
import { CartProductItem, ProductItem } from '../types'
import Pagination from '../components/Pagination'
import ProductList from '../components/ProductList'

const ShopPage: React.FC = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('context error ShopPage')
  }
  const { pagination, setPagination, cart, setCart } = context
  const data = products
  const numberOfPages = Math.ceil(products.length / pagination.limit)

  const navigateToPage = (pageNumber: number) => {
    setPagination({
      ...pagination,
      page: pageNumber,
      start: (pageNumber - 1) * pagination.limit,
      perPage: pageNumber * pagination.limit,
    })
  }
  const handleAddToCart = (product: ProductItem) => {
    //for ts
    if (!cart) {
      throw new Error('cart is not available')
    }

    //if product is already in cart
    const isProductInCart = cart.products.some((p) => p.id === product.id)

    let newProducts
    if (isProductInCart) {
      //if so increaase count
      newProducts = cart.products.map((p) =>
        p.id !== product.id ? p : { ...p, count: p.count + 1 }
      )
    } else {
      //if not add product
      const newProduct: CartProductItem = { ...product, count: 1 }
      newProducts = [...cart.products, newProduct]
    }

    //totalPrice
    const totalPrice = newProducts.reduce(
      (total, product) => total + parseFloat(product.price) * product.count,
      0
    )

    const newCart = { products: newProducts, totalPrice }
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  useEffect(() => {
    navigateToPage(1)
  }, [])

  return (
    <div className=" flex flex-col justify-between items-center flex-1 ">
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
