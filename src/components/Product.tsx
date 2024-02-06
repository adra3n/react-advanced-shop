import React, { useEffect, useState } from 'react'
import { ProductItem } from '../types/types'
import Button from './Button'
import useTLFormatter from '../hooks/useTLFormat'
import { useNavigate } from 'react-router-dom'
import Skeleton from './Skeleton'

type ProductProps = {
  product: ProductItem
  handleAddToCart: (product: ProductItem) => void
}

const Product: React.FC<ProductProps> = ({ product, handleAddToCart }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleProductDetailsPage = () => {
    navigate(`/product/${product.id}`)
  }

  //image loading check for skeletons
  useEffect(() => {
    setIsLoading(true)
    const img = new Image()
    img.src = product.image
    img.onload = () => setIsLoading(false)
  }, [product])

  return (
    <div className="flex flex-col items-start justify-between gap-3 md:w-56 w-80 m-3 bg-white rounded p-5 shadow-lg">
      {/* load skeletons till image */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <img
          className="rounded cursor-pointer h-48"
          src={product?.image}
          alt={product?.name}
          onClick={handleProductDetailsPage}
        />
      )}
      <p className="text-sm text-blueBg font-normal">
        {useTLFormatter(+product?.price ?? 0)} ₺
      </p>
      <p className="text-sm h-8 font-normal">{product?.name ?? ''}</p>
      <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
    </div>
  )
}

export default Product
