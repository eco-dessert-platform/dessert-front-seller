import { queryOptions } from '@tanstack/react-query'

import { getDailySettlements, getSettlementItems } from './settlement.api'
import { DailySettlementFilters } from './settlement.type'
import { SettlementFilters } from './types'

export const settlementQueries = {
  all: () => ['settlement'],
  dailyLists: () => [...settlementQueries.all(), 'daily'],
  daily: (filters: DailySettlementFilters) =>
    queryOptions({
      queryKey: [...settlementQueries.dailyLists(), filters],
      queryFn: () => getDailySettlements(filters),
    }),
  itemLists: () => [...settlementQueries.all(), 'items'],
  items: (filters: SettlementFilters) =>
    queryOptions({
      queryKey: [...settlementQueries.itemLists(), filters],
      queryFn: () => getSettlementItems(filters),
    }),
}
