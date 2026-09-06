import { useState } from 'react'

import { DailySettlementFilters } from '@/entity/settlement/settlement.type'

const INITIAL_FILTERS: DailySettlementFilters = {
  page: 0,
  size: 10,
  startDate: null,
  endDate: null,
}

export function useDailySettlementFilter() {
  const [draftFilters, setDraftFilters] =
    useState<DailySettlementFilters>(INITIAL_FILTERS)
  const [appliedFilters, setAppliedFilters] =
    useState<DailySettlementFilters>(INITIAL_FILTERS)

  const apply = () => {
    setAppliedFilters({ ...draftFilters, page: 0 })
  }

  const setPage = (page: number) => {
    setAppliedFilters((prev) => ({ ...prev, page }))
  }

  return {
    draftFilters,
    setDraftFilters,
    appliedFilters,
    apply,
    setPage,
  }
}
