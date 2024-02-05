import { useContext } from 'react'
import AppContext from '../context/AppContext'
import { ProductItem, CartProductItem } from '../types/types'

export const useAddToCart = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('context error in useAddToCart')
  }
  const { cart, setCart } = context

  const handleAddToCart = (product: ProductItem) => {
    if (!cart) {
      throw new Error('cart is not available')
    }

    const isProductInCart = cart.products.some((p) => p.id === product.id)

    let newProducts
    if (isProductInCart) {
      newProducts = cart.products.map((p) =>
        p.id !== product.id ? p : { ...p, count: p.count + 1 }
      )
    } else {
      const newProduct: CartProductItem = { ...product, count: 1 }
      newProducts = [...cart.products, newProduct]
    }

    const totalPrice = newProducts.reduce(
      (total, product) => total + +product.price * product.count,
      0
    )

    const newCart = { products: newProducts, totalPrice }
    setCart(newCart)
  }

  return handleAddToCart
}
