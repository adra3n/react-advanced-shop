import { createContext } from 'react'
import { PaginationItem, CartItem } from '../types'

export type AppContextType = {
  pagination: PaginationItem
  setPagination: React.Dispatch<React.SetStateAction<PaginationItem>>
  cart: CartItem
  setCart: React.Dispatch<React.SetStateAction<CartItem>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export default AppContext
