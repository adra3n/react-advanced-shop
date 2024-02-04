export type PaginationItem = {
  limit: number
  total: number
  start: number
  page: number
  perPage: number
}

export type ProductItem = {
  id: string
  price: string
  image: string
  brand: string
  model: string
  name: string
  description: string
  createdAt: string
}

export type CartProductItem = ProductItem & {
  count: number
}

export type CartItem = {
  totalPrice: number
  products: CartProductItem[]
} | null
