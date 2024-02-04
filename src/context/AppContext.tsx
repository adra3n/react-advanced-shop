import { createContext } from 'react'
import { PaginationItem, CartItem, ProductItem } from '../types/types'

export type AppContextType = {
  pagination: PaginationItem
  setPagination: React.Dispatch<React.SetStateAction<PaginationItem>>
  cart: CartItem
  setCart: React.Dispatch<React.SetStateAction<CartItem>>
  products: ProductItem[]
  filteredProducts: ProductItem[]
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export default AppContext
