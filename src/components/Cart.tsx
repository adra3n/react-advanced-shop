import { CartItem, CartProductItem } from '../types'
import Button from './Button'

interface CartProps {
  cart: CartItem
  setCart: (cart: CartItem) => void
}

const Cart = ({ cart, setCart }: CartProps) => {
  const handleCheckout = () => {
    window.alert(`checkout total price: ${cart?.totalPrice}₺`)
  }

  const handleIncrease = (product: CartProductItem) => {
    if (cart) {
      const newCart = {
        ...cart,
        products: cart.products.map((p) =>
          p.id === product.id ? { ...p, count: p.count + 1 } : p
        ),
        totalPrice: cart.totalPrice + Number(product.price),
      }
      setCart(newCart)
    }
  }

  const handleDecrease = (product: CartProductItem) => {
    if (cart) {
      let newProducts = cart.products.map((p) =>
        p.id === product.id && p.count > 0 ? { ...p, count: p.count - 1 } : p
      )
      //remov product if count 0
      newProducts = newProducts.filter((p) => p.count > 0)

      const newCart = {
        ...cart,
        products: newProducts,
        totalPrice:
          product.count > 0
            ? cart.totalPrice - Number(product.price)
            : cart.totalPrice,
      }
      setCart(newCart)
    }
  }

  return (
    <div className="flex flex-col w-64 gap-5 m-5 mt-12">
      <div className="flex flex-col items-center justify-between  bg-white rounded shadow-xl py-5">
        <div className="">
          {cart &&
            cart.products.map((product: CartProductItem, i: number) => (
              <div
                key={i}
                className="flex flex-row justify-between items-center gap-2 m-2"
              >
                <div className="h-10">
                  <p className="text-sm ">{product.name}</p>
                  <p className="text-blue-700 text-xs">{product.price} ₺</p>
                </div>
                <div className="flex items-center h-8 gap-1 font-bold">
                  <button onClick={() => handleDecrease(product)}>-</button>
                  <div className="bg-blue-700 text-white font-normal w-8 h-8 text-center flex items-center justify-center ">
                    <p>{product.count}</p>
                  </div>
                  <button onClick={() => handleIncrease(product)}>+</button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col  gap-2  bg-white rounded shadow-xl p-5">
        <div>
          Total Price:{' '}
          <span className="text-blue-700 font-semibold">
            {cart?.totalPrice} ₺
          </span>
        </div>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  )
}

export default Cart
