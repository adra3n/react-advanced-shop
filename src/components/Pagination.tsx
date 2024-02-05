import React from 'react'
import { PaginationItem, ProductItem } from '../types/types'

type PaginationProps = {
  pagination: PaginationItem
  navigateToPage: (page: number) => void
  numberOfPages: number
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  navigateToPage,
  numberOfPages,
}) => {
  return (
    <div className="flex flex-row text-lg w-64 justify-between ">
      {pagination.page > 1 && (
        <button
          className=" px-4 py-2 "
          onClick={() => navigateToPage(pagination.page - 1)}
        >
          {'<'}
        </button>
      )}
      {pagination.page !== 1 && pagination.page !== 2 && (
        <button className=" px-4 py-2 " onClick={() => navigateToPage(1)}>
          1
        </button>
      )}
      {pagination.page > 3 && <span className="px-4 py-2">...</span>}
      {pagination.page > 1 && (
        <button
          className=" px-4 py-2 "
          onClick={() => navigateToPage(pagination.page - 1)}
        >
          {pagination.page - 1}
        </button>
      )}
      <span className="px-4 py-2 bg-beigeBg text-blueBg rounded">
        {numberOfPages > 0 ? pagination.page : null}
      </span>
      {pagination.page < numberOfPages && (
        <button
          className=" px-4 py-2 "
          onClick={() => navigateToPage(pagination.page + 1)}
        >
          {pagination.page + 1}
        </button>
      )}
      {pagination.page < numberOfPages - 2 && (
        <span className="px-4 py-2">...</span>
      )}
      {pagination.page !== numberOfPages &&
        pagination.page !== numberOfPages - 1 && (
          <button
            className=" px-4 py-2 "
            onClick={() => navigateToPage(numberOfPages)}
          >
            {numberOfPages > 0 ? numberOfPages : null}
          </button>
        )}
      {pagination.page < numberOfPages && (
        <button
          className=" px-4 py-2 "
          onClick={() => navigateToPage(pagination.page + 1)}
        >
          {'>'}
        </button>
      )}
    </div>
  )
}

export default Pagination
