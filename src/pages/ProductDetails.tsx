import React, { useContext, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import AppContext from '../context/AppContext'
import useTLFormatter from '../hooks/useTLFormat'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const context = useContext(AppContext)
  //for ts
  if (!context) {
    throw new Error('context error ProductDetailsPage')
  }
  const { products } = context

  const product = useMemo(() => {
    return products.find((product) => product.id === id)
  }, [products, id])

  // if no product throw error
  if (!product) {
    throw new Error(`no product with Id >>> ${id}`)
  }
  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-10 m-3 mt-12 bg-white rounded p-5 shadow-lg flex-1 ">
      <img
        className="flex flex-1 rounded"
        src={product.image}
        alt={product.name}
      />
      <div className=" flex-col  justify-between gap-3 h-full min-w-48 flex-1">
        <div className="flex  flex-col items-center justify-between w-full">
          <p className="text-lg text-blueBg">
            {useTLFormatter(+product.price)} ₺
          </p>
          <p className="text-lg h-8">{product.name}</p>
        </div>
        <Button onClick={() => {}}>Add to cart</Button>
      </div>
    </div>
  )
}

export default ProductDetails
