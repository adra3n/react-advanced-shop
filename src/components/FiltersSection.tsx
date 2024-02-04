import React, { ChangeEvent, useState } from 'react'

type FiltersSectionProps = {
  sortOption: string
  handleSortChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  sortOption,
  handleSortChange,
}) => {
  return (
    <div className="flex flex-col w-56 gap-5 m-5 mt-12">
      <div>
        <h4 className="mb-1 text-xs text-gray-400">Sort By</h4>
        <div className="flex flex-col justify-between bg-white rounded shadow-xl p-3">
          <form className="flex flex-col justify-between gap-2 text-sm">
            <label>
              <input
                type="radio"
                value="Old to New"
                checked={sortOption === 'Old to New'}
                onChange={handleSortChange}
                className="mr-1"
              />
              Old to New
            </label>
            <label>
              <input
                type="radio"
                value="New to Old"
                checked={sortOption === 'New to Old'}
                onChange={handleSortChange}
                className="mr-1"
              />
              New to Old
            </label>
            <label>
              <input
                type="radio"
                value="Price High to Low"
                checked={sortOption === 'Price High to Low'}
                onChange={handleSortChange}
                className="mr-1"
              />
              Price High to Low
            </label>
            <label>
              <input
                type="radio"
                value="Price Low to High"
                checked={sortOption === 'Price Low to High'}
                onChange={handleSortChange}
                className="mr-1"
              />
              Price Low to High
            </label>
          </form>
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-xs text-gray-400">Brands</h4>
        <div className="flex flex-col justify-between bg-white rounded shadow-xl p-3"></div>
      </div>

      <div>
        <h4 className="mb-1 text-xs text-gray-400">Models</h4>
        <div className="flex flex-col justify-between bg-white rounded shadow-xl p-3">
          <p> Search Input here</p>s{' '}
        </div>
      </div>
    </div>
  )
}

export default FiltersSection
