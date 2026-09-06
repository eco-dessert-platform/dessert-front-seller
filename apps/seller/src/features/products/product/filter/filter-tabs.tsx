import { Tab, TabList, TabTrigger } from '@dessert/ui'

import type {
  ProductBoardStatus,
  TabCounts,
} from '@/entity/products/product/product-board.type'
import { EMPTY_TAB_COUNTS } from '@/entity/products/product/product-board.type'

const STATUS_TABS: Array<{
  value: ProductBoardStatus
  label: string
  countKey: keyof TabCounts | 'ALL'
}> = [
  { value: '전체', label: '전체', countKey: 'ALL' },
  { value: '판매중', label: '판매중', countKey: 'ON_SALE' },
  { value: '품절', label: '품절', countKey: 'OUT_OF_STOCK' },
  { value: '판매중지', label: '판매중지', countKey: 'STOPPED' },
  { value: '판매대기', label: '판매대기', countKey: 'PENDING' },
  { value: '판매금지', label: '판매금지', countKey: 'BANNED' },
]

function getTabCount(tabCounts: TabCounts, countKey: keyof TabCounts | 'ALL') {
  if (countKey === 'ALL') {
    return (
      tabCounts.ON_SALE +
      tabCounts.OUT_OF_STOCK +
      tabCounts.STOPPED +
      tabCounts.PENDING +
      tabCounts.BANNED
    )
  }

  return tabCounts[countKey]
}

type FilterTabsProps = {
  saleStatus: ProductBoardStatus
  tabCounts?: TabCounts
  onStatusChange: (status: ProductBoardStatus) => void
}

export const FilterTabs = ({
  saleStatus,
  tabCounts = EMPTY_TAB_COUNTS,
  onStatusChange,
}: FilterTabsProps) => {
  return (
    <Tab
      variant="btn"
      className="mb-5"
      value={saleStatus}
      onValueChange={(value) => onStatusChange(value as ProductBoardStatus)}
    >
      <TabList>
        {STATUS_TABS.map((tab) => (
          <TabTrigger
            key={tab.value}
            value={tab.value}
            number={getTabCount(tabCounts, tab.countKey)}
          >
            {tab.label}
          </TabTrigger>
        ))}
      </TabList>
    </Tab>
  )
}
