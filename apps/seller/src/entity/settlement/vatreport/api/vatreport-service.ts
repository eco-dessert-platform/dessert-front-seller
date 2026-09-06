import type { ApiResponse } from '@/entity/auth/types'
import type {
  IVatReportFilter,
  IVatReportResponse,
} from '@/entity/settlement/vatreport/entities'
import { client } from '@/shared/utils/axios'
import { getFileNameFromContentDisposition } from '@/shared/utils/file-download'
import { AxiosInstance } from 'axios'
import { format, parseISO } from 'date-fns'

const VAT_EXCEL_DEFAULT_TYPE = 'MONTHLY'
const VAT_EXCEL_DEFAULT_FILENAME = '부가세신고내역.xlsx'

type VatReportResponse = ApiResponse<IVatReportResponse>

const toMonthParam = (date?: string) => {
  if (!date) {
    return undefined
  }

  try {
    const parsed = parseISO(date)
    return Number.isNaN(parsed.getTime()) ? undefined : format(parsed, 'yyyy-MM')
  } catch {
    return undefined
  }
}

class VatService {
  constructor(private readonly http: AxiosInstance) {}

  async getVatReport(
    filters: IVatReportFilter = {},
  ): Promise<IVatReportResponse> {
    const { data } = await this.http.get<VatReportResponse>(
      '/api/v1/seller/vat',
      {
        params: {
          startMonth: toMonthParam(filters.startDate),
          endMonth: toMonthParam(filters.endDate),
        },
      },
    )

    if (!data.success || !data.result) {
      throw new Error(data.message ?? '부가세 신고 내역 조회에 실패했습니다.')
    }

    return data.result
  }

  async getExcelBlob(
    filters: IVatReportFilter = {},
  ): Promise<{ data: Blob; fileName: string }> {
    const { data, headers } = await this.http.get<Blob>(
      '/api/v1/seller/vat/excel',
      {
        params: {
          startMonth: toMonthParam(filters.startDate),
          endMonth: toMonthParam(filters.endDate),
          type: VAT_EXCEL_DEFAULT_TYPE,
        },
        responseType: 'blob',
      },
    )

    const mimeType = data.type?.toLowerCase().split(';')[0].trim()

    if (mimeType === 'application/json') {
      const fallbackMessage = '엑셀 다운로드에 실패했습니다.'
      let message: string | undefined

      try {
        const errorText = await data.text()
        message = (JSON.parse(errorText) as { message?: string }).message
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }

      throw new Error(message ?? fallbackMessage)
    }

    const fileName = getFileNameFromContentDisposition(
      headers['content-disposition'],
      VAT_EXCEL_DEFAULT_FILENAME,
    )

    return { data, fileName }
  }
}

export const vatService = new VatService(client)
