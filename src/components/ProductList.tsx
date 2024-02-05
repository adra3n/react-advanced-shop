import React, { useContext } from 'react'
import { ProductItem } from '../types/types'
import Product from './Product'
import AppContext from '../context/AppContext'

type ProductListProps = {
  handleAddToCart: (product: ProductItem) => void
}

const ProductList: React.FC<ProductListProps> = ({ handleAddToCart }) => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('context error ProductList')
  }
  const { pagination, filteredProducts } = context

  return (
    <div className="text-2xl font-bold my-10 flex flex-row flex-wrap justify-center items-center flex-1 ">
      {filteredProducts
        .slice(pagination.start, pagination.perPage)
        .map((product, i) => (
          <div key={i}>
            <Product product={product} handleAddToCart={handleAddToCart} />
          </div>
        ))}
    </div>
  )
}

export default ProductList
