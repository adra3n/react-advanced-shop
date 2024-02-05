import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Product from './components/Product'
import Header from './components/Header'
import FiltersSection from './components/FiltersSection'
import Cart from './components/Cart'
import NotFound from './pages/NotFound'
import { products } from './data/mock'
import Pagination from './components/Pagination'

const product = {
  id: 1,
  name: 'Test',
  price: '100',
  image: 'test',
  brand: 'Test',
  model: 'Test',
  description: 'Test',
  createdAt: '2022-01-01T00:00:00Z',
}

//Header

it('renders header title', () => {
  const handleSearch = jest.fn()
  const { getByText } = render(
    <MemoryRouter>
      <Header search="" handleSearch={handleSearch} totalPrice={0} />{' '}
    </MemoryRouter>
  )

  expect(getByText('Eteration')).toBeInTheDocument()
})

it('changes search input value when typed', () => {
  const handleSearch = jest.fn()
  const { getByPlaceholderText } = render(
    <MemoryRouter>
      <Header search="" handleSearch={handleSearch} totalPrice={0} />
    </MemoryRouter>
  )
  const input = getByPlaceholderText('Search')

  fireEvent.change(input, { target: { value: 'test' } })

  expect(handleSearch).toHaveBeenCalledWith('test')
})

it('renders total price', () => {
  const handleSearch = jest.fn()
  const { getByText } = render(
    <MemoryRouter>
      <Header search="" handleSearch={handleSearch} totalPrice={100} />
    </MemoryRouter>
  )
  expect(getByText('100₺')).toBeInTheDocument()
})

it('updates filteredProducts when typed into search bar', () => {
  const handleSearch = jest.fn()
  const { getByPlaceholderText } = render(
    <MemoryRouter>
      <Header search="" handleSearch={handleSearch} totalPrice={0} />
    </MemoryRouter>
  )

  fireEvent.change(getByPlaceholderText('Search'), {
    target: { value: 'test' },
  })

  expect(handleSearch).toHaveBeenCalledWith('test')
})

//Product

it('renders product details correctly', () => {
  const handleAddToCart = jest.fn()

  const { getByText } = render(
    <MemoryRouter>
      <Product product={product} handleAddToCart={handleAddToCart} />
    </MemoryRouter>
  )

  expect(getByText(product.name)).toBeInTheDocument()
  expect(getByText(product.brand)).toBeInTheDocument()
  expect(getByText(product.model)).toBeInTheDocument()
  expect(getByText(`${product.price} ₺`)).toBeInTheDocument()
})
it('renders product image correctly', () => {
  const handleAddToCart = jest.fn()

  const { getByAltText } = render(
    <MemoryRouter>
      <Product product={product} handleAddToCart={handleAddToCart} />
    </MemoryRouter>
  )

  expect(getByAltText(product.name)).toBeInTheDocument()
})

it('renders "Add to cart" button', () => {
  const handleAddToCart = jest.fn()

  const { getByText } = render(
    <MemoryRouter>
      <Product product={product} handleAddToCart={handleAddToCart} />
    </MemoryRouter>
  )

  expect(getByText('Add to cart')).toBeInTheDocument()
})

it('adds product to cart "Add to cart" button click', () => {
  const handleAddToCart = jest.fn()

  const { getByText } = render(
    <MemoryRouter>
      <Product product={product} handleAddToCart={handleAddToCart} />
    </MemoryRouter>
  )

  fireEvent.click(getByText('Add to cart'))

  expect(handleAddToCart).toHaveBeenCalledWith(product)
})

//Filter
it('renders sort options', () => {
  const handleSortChange = jest.fn()
  const handleBrandFilter = jest.fn()
  const handleModelFilter = jest.fn()
  const { getByLabelText } = render(
    <MemoryRouter>
      <FiltersSection
        sortOption="Old to New"
        handleSortChange={handleSortChange}
        products={products}
        handleBrandFilter={handleBrandFilter}
        handleModelFilter={handleModelFilter}
      />
    </MemoryRouter>
  )

  expect(getByLabelText('Old to New')).toBeInTheDocument()
  expect(getByLabelText('New to Old')).toBeInTheDocument()
  expect(getByLabelText('Price High to Low')).toBeInTheDocument()
  expect(getByLabelText('Price Low to High')).toBeInTheDocument()
})

it('renders brand options', () => {
  const handleSortChange = jest.fn()
  const handleBrandFilter = jest.fn()
  const handleModelFilter = jest.fn()

  const { getByLabelText } = render(
    <MemoryRouter>
      <FiltersSection
        sortOption="Old to New"
        handleSortChange={handleSortChange}
        products={products}
        handleBrandFilter={handleBrandFilter}
        handleModelFilter={handleModelFilter}
      />
    </MemoryRouter>
  )

  products.forEach((product) => {
    expect(getByLabelText(product.brand)).toBeInTheDocument()
  })
})

it('renders model options', () => {
  const handleSortChange = jest.fn()
  const handleBrandFilter = jest.fn()
  const handleModelFilter = jest.fn()

  const { getByLabelText } = render(
    <MemoryRouter>
      <FiltersSection
        sortOption="Old to New"
        handleSortChange={handleSortChange}
        products={products}
        handleBrandFilter={handleBrandFilter}
        handleModelFilter={handleModelFilter}
      />
    </MemoryRouter>
  )

  products.forEach((product) => {
    expect(getByLabelText(product.model)).toBeInTheDocument()
  })
})

//Cart

it('renders empty cart message when cart is empty', () => {
  const setCart = jest.fn()
  const { getByText } = render(
    <MemoryRouter>
      <Cart cart={{ products: [], totalPrice: 0 }} setCart={setCart} />{' '}
    </MemoryRouter>
  )

  expect(getByText('empty!')).toBeInTheDocument()
})

//404

it('renders NotFound page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )

  expect(getByText('404 Not Found')).toBeInTheDocument()
  expect(getByText('Return to home')).toBeInTheDocument()
})

//Pagination
it('renders pagination first page button', () => {
  const navigateToPage = jest.fn()
  const { getByText } = render(
    <MemoryRouter>
      <Pagination
        pagination={{ limit: 10, total: 100, start: 0, page: 5, perPage: 10 }}
        navigateToPage={navigateToPage}
        numberOfPages={10}
      />
    </MemoryRouter>
  )

  expect(getByText('1')).toBeInTheDocument()
})

it('renders last page button correct', () => {
  const navigateToPage = jest.fn()
  const { getByText } = render(
    <MemoryRouter>
      <Pagination
        pagination={{ limit: 10, total: 100, start: 0, page: 5, perPage: 10 }}
        navigateToPage={navigateToPage}
        numberOfPages={10}
      />
    </MemoryRouter>
  )

  expect(getByText('10')).toBeInTheDocument()
})

it('renders current page correct', () => {
  const navigateToPage = jest.fn()
  const { getByText } = render(
    <MemoryRouter>
      <Pagination
        pagination={{ limit: 10, total: 100, start: 0, page: 5, perPage: 10 }}
        navigateToPage={navigateToPage}
        numberOfPages={10}
      />
    </MemoryRouter>
  )

  expect(getByText('5')).toBeInTheDocument()
})
