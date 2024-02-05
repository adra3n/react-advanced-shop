import React, { ChangeEvent, useEffect, useState } from 'react'
import { ProductItem } from '../types/types'

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
    <div className="flex flex-col gap-5 mt-10 md:ml-[5vw] ml-2  md:w-56 w-36">
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
        <div className="flex flex-col justify-between bg-white rounded shadow-xl p-3 ">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded text-gray-700 bg-beigeBg my-2"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
          />
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
        <h4 className="mb-1 text-xs text-gray-400">Models</h4>
        <div className="flex flex-col justify-between bg-white rounded shadow-xl p-3 ">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded text-gray-700 bg-beigeBg my-2"
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
          />
          <div className="flex flex-col max-h-32 overflow-hidden overflow-y-scroll">
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
