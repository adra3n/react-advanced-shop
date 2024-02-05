import React from 'react'
import { ProductItem } from '../types/types'
import Button from './Button'
import useTLFormatter from '../hooks/useTLFormat'
import { useNavigate } from 'react-router-dom'

type ProductProps = {
  product: ProductItem
  handleAddToCart: (product: ProductItem) => void
}

const Product: React.FC<ProductProps> = ({ product, handleAddToCart }) => {
  const navigate = useNavigate()

  const handleProductDetailsPage = () => {
    navigate(`/product/${product.id}`)
  }
  return (
    <div className="flex flex-col items-start justify-between gap-3 md:w-64 w-80 m-3 bg-white rounded p-5 shadow-lg">
      <img
        className="rounded cursor-pointer"
        src={product.image}
        alt={product.name}
        onClick={handleProductDetailsPage}
      />
      <p className="text-sm text-blueBg">{useTLFormatter(+product.price)} ₺</p>
      <p className="text-sm h-8">{product.name}</p>
      <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
    </div>
  )
}

export default Product
