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
    <>
      {/* dont show pagination if numberOfPages > 1 */}
      {numberOfPages > 1 && (
        <div className="flex flex-row text-lg w-64 justify-between ">
          {/* prev page. show if page more than 1 */}
          {pagination.page > 1 && (
            <button
              className=" px-4 py-2 "
              onClick={() => navigateToPage(pagination.page - 1)}
            >
              {'<'}
            </button>
          )}
          {/* first page */}
          {pagination.page !== 1 && pagination.page !== 2 && (
            <button className=" px-4 py-2 " onClick={() => navigateToPage(1)}>
              1
            </button>
          )}
          {/* show ... if got more than next and prev pages */}
          {pagination.page > 3 && <span className="px-4 py-2">...</span>}
          {/* prev page numberpage */}
          {pagination.page > 1 && (
            <button
              className=" px-4 py-2 "
              onClick={() => navigateToPage(pagination.page - 1)}
            >
              {pagination.page - 1}
            </button>
          )}
          {/* current page. show if got any pages  */}
          <span className="px-4 py-2 bg-beigeBg text-blueBg rounded">
            {numberOfPages > 0 ? pagination.page : null}
          </span>
          {/* next page number */}
          {pagination.page < numberOfPages && (
            <button
              className=" px-4 py-2 "
              onClick={() => navigateToPage(pagination.page + 1)}
            >
              {pagination.page + 1}
            </button>
          )}
          {/* show ... if got more than next and prev pages */}
          {pagination.page < numberOfPages - 2 && (
            <span className="px-4 py-2">...</span>
          )}
          {/* last page */}
          {pagination.page !== numberOfPages &&
            pagination.page !== numberOfPages - 1 && (
              <button
                className=" px-4 py-2 "
                onClick={() => navigateToPage(numberOfPages)}
              >
                {numberOfPages > 0 ? numberOfPages : null}
              </button>
            )}
          {/* next page if there are more pages */}
          {pagination.page < numberOfPages && (
            <button
              className=" px-4 py-2 "
              onClick={() => navigateToPage(pagination.page + 1)}
            >
              {'>'}
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default Pagination
