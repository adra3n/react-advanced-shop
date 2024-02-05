import React from 'react'
import { ProductItem } from '../types/types'
import Button from './Button'

type ProductProps = {
  product: ProductItem
  handleAddToCart: (product: ProductItem) => void
}

const handleProductClick = () => {
  console.log('product clicked')
}

const Product: React.FC<ProductProps> = ({ product, handleAddToCart }) => (
  <div
    className="flex flex-col items-start justify-between gap-3 w-48 m-3 bg-white rounded p-5 shadow-lg  min-w-[50px]"
    onClick={handleProductClick}
  >
    <img className="rounded" src={product.image} alt={product.name} />
    <p className="text-sm text-blueBg">{product.price} ₺</p>
    <p className="text-sm h-8">{product.name}</p>
    <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
  </div>
)

export default Product
