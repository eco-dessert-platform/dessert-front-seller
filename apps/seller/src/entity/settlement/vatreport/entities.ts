export interface IVatReportFilter {
  startDate?: string
  endDate?: string
  page?: number
  size?: number
}

export type TVatReportExcelType = 'MONTHLY' | 'DAILY' | 'ORDER'

export interface IVatReportRow {
  month: string
  taxableSalesAmount: number
  taxFreeSalesAmount: number
  creditCardAmount: number
  cashReceiptIncomeDeductionAmount: number
  cashReceiptExpenseProofAmount: number
  etcAmount: number
}

export interface IVatReportResponse {
  startMonth: string
  endMonth: string
  items: IVatReportRow[]
}
