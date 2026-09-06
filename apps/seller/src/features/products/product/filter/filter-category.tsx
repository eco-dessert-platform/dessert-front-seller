import { useMemo } from 'react'

import { Button, Dropdown, Input } from '@dessert/ui'

import type { ProductBoardFilters } from '@/entity/products/product/product-board.type'
import {
  BreadOptions,
  ProductFilterMainOption,
  SearchOptions,
  SnackOptions,
} from '@/entity/products/product/product-filter-options.mock'

type FilterCategoryProps = {
  filters: ProductBoardFilters
  mainCategoryValue: string
  subCategoryValue: string
  searchOpt: string
  onMainCategoryChange: (value: string) => void
  onSubCategoryChange: (value: string) => void
  onSearchOptChange: (value: string) => void
  onFiltersChange: (next: ProductBoardFilters) => void
  onSearch: () => void
}

export const FilterCategory = ({
  filters,
  mainCategoryValue,
  subCategoryValue,
  searchOpt,
  onMainCategoryChange,
  onSubCategoryChange,
  onSearchOptChange,
  onFiltersChange,
  onSearch,
}: FilterCategoryProps) => {
  const subOptions = useMemo(
    () =>
      mainCategoryValue === 'bread'
        ? BreadOptions
        : mainCategoryValue === 'snack'
          ? SnackOptions
          : [],
    [mainCategoryValue],
  )

  const handleKeywordChange = (keyword: string) => {
    onFiltersChange({
      ...filters,
      keyword: keyword || undefined,
    })
  }

  return (
    <>
      <Dropdown
        options={ProductFilterMainOption}
        value={mainCategoryValue}
        placeholder="대분류"
        onSelect={(value) => {
          onMainCategoryChange(value)
          onSubCategoryChange('')
          const mainLabel = ProductFilterMainOption.find(
            (option) => option.value === value,
          )?.label

          onFiltersChange({
            ...filters,
            mainCategory: mainLabel,
            category: undefined,
            keyword: undefined,
          })
        }}
        className="w-0 min-w-[150px] shrink-0"
      />
      <Dropdown
        options={subOptions}
        value={subCategoryValue}
        placeholder="중분류"
        disabled={!mainCategoryValue}
        onSelect={(value) => {
          onSubCategoryChange(value)
          const subLabel = subOptions.find(
            (option) => option.value === value,
          )?.label

          onFiltersChange({
            ...filters,
            category: subLabel,
          })
        }}
        className="w-0 min-w-[150px] shrink-0"
      />
      <Dropdown
        options={SearchOptions}
        value={searchOpt}
        className="w-0 min-w-[150px] shrink-0"
        onSelect={onSearchOptChange}
        placeholder="전체"
      />
      <Input
        placeholder="1~50자로 검색해 주세요"
        value={filters.keyword ?? ''}
        onChange={(e) => handleKeywordChange(e.target.value)}
        disabled={!mainCategoryValue || !subCategoryValue}
        className="flex-1"
        maxLength={50}
      />
      <Button
        title="조회"
        size="md"
        className="min-w-[72px]"
        onClick={onSearch}
      />
    </>
  )
}
