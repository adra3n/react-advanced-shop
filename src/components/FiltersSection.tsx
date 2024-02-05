import React, { ChangeEvent, useEffect, useState } from 'react'
import { ProductItem } from '../types/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

type FiltersSectionProps = {
  sortOption: string
  handleSortChange: (event: ChangeEvent<HTMLInputElement>) => void
  products: ProductItem[]
  handleBrandFilter: (brands: string[]) => void
  handleModelFilter: (models: string[]) => void
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  sortOption,
  handleSortChange,
  products,
  handleBrandFilter,
  handleModelFilter,
}) => {
  const [brands, setBrands] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [brandSearch, setBrandSearch] = useState('')
  const [modelSearch, setModelSearch] = useState('')

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedModels, setSelectedModels] = useState<string[]>([])

  useEffect(() => {
    let newBrands: string[] = []
    let newModels: string[] = []
    products.forEach((product) => {
      if (!newBrands.includes(product.brand)) {
        newBrands.push(product.brand)
      }
      if (!newModels.includes(product.model)) {
        newModels.push(product.model)
      }
    })
    setBrands(newBrands)
    setModels(newModels)
  }, [products])

  const handleBrandCheckboxChange = (brand: string) => {
    let newSelectedBrands
    if (selectedBrands.includes(brand)) {
      newSelectedBrands = selectedBrands.filter((b) => b !== brand)
    } else {
      newSelectedBrands = [...selectedBrands, brand]
    }
    setSelectedBrands(newSelectedBrands)
    handleBrandFilter(newSelectedBrands)
  }

  const handleModelCheckboxChange = (model: string) => {
    let newSelectedModels
    if (selectedModels.includes(model)) {
      newSelectedModels = selectedModels.filter((m) => m !== model)
    } else {
      newSelectedModels = [...selectedModels, model]
    }
    setSelectedModels(newSelectedModels)
    handleModelFilter(newSelectedModels)
  }

  return (
    <div className="flex md:flex-col flex-row items-start md:justify-start justify-center md:gap-5 gap-2 mt-10 md:ml-[5vw] md:w-36 ">
      <div>
        <h4 className="md:mb-1 text-xs md:text-start text-center text-gray-400">
          Sort by
        </h4>
        <div className="flex flex-col justify-between bg-white rounded shadow-xl p-3  md:text-sm text-xs md:w-full w-32">
          <form className="flex flex-col justify-between gap-4 py-4 md:text-sm text-xs">
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
        <h4 className="md:mb-1 text-xs md:text-start text-center text-gray-400">
          Brands
        </h4>
        <div className="flex flex-col justify-between bg-white rounded shadow-xl p-3  md:text-sm text-xs md:w-full w-32">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 p-2 rounded text-blue-500 bg-beigeBg my-2 w-full placeholder-blue-500 md:text-sm text-xs"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500"
            />
          </div>
          <div className="flex flex-col max-h-32 overflow-hidden overflow-y-scroll">
            {brands
              .filter((brand) => brand.includes(brandSearch))
              .map((brand, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandCheckboxChange(brand)}
                  />
                  {brand}
                </label>
              ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-xs md:text-start text-center text-gray-400">
          Models
        </h4>
        <div className="flex flex-col justify-between bg-white rounded shadow-xl p-3 md:w-full w-32 md:text-sm text-xs">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 p-2 rounded text-blue-500 bg-beigeBg my-2 w-full placeholder-blue-500"
              value={modelSearch}
              onChange={(e) => setModelSearch(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500"
            />
          </div>

          <div className="flex flex-col max-h-32 overflow-hidden overflow-y-scroll md:text-sm text-xs">
            {models
              .filter((model) => model.includes(modelSearch))
              .map((model, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={selectedModels.includes(model)}
                    onChange={() => handleModelCheckboxChange(model)}
                  />
                  {model}
                </label>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersSection
