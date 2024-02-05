import React, { useContext, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import AppContext from '../context/AppContext'
import useTLFormatter from '../hooks/useTLFormat'
import { useAddToCart } from '../hooks/useAddToCart'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const context = useContext(AppContext)

  if (!context) {
    throw new Error('context error ProductDetailsPage')
  }
  const { products } = context

  const product = useMemo(() => {
    return products.find((product) => product.id === id)
  }, [products, id])

  useEffect(() => {
    if (!product) {
      navigate('/404', { replace: true })
    }
  }, [product, navigate])

  // if no product throw error
  if (!product) {
    return null
  }
  //add to cart hook
  const handleAddToCart = useAddToCart()

  return (
    <div className="flex flex-row flex-wrap items-start justify-between gap-10 m-3 mt-12 bg-white rounded p-5 shadow-lg flex-1 ">
      <img
        className="flex flex-1 rounded"
        src={product.image}
        alt={product.name}
      />
      <div className=" flex-col  justify-between   min-w-48 flex-1">
        <div className="flex  flex-col items-center justify-between md:items-start  w-full mb-8">
          <p className="text-xl ">{product.name}</p>
          <p className="text-xl text-blueBg h-12">
            {useTLFormatter(+product.price)} ₺
          </p>
          <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
        </div>
        <p className="md:text-base text-sm mb-2">{product.description}</p>
      </div>
    </div>
  )
}

export default ProductDetails
