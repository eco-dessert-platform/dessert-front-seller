export const PRODUCTION_START_TIME_OPTIONS = [
  { value: 'T_00_01', label: '00:00 ~ 01:00' },
  { value: 'T_01_02', label: '01:00 ~ 02:00' },
  { value: 'T_02_03', label: '02:00 ~ 03:00' },
  { value: 'T_03_04', label: '03:00 ~ 04:00' },
  { value: 'T_04_05', label: '04:00 ~ 05:00' },
  { value: 'T_05_06', label: '05:00 ~ 06:00' },
  { value: 'T_06_07', label: '06:00 ~ 07:00' },
  { value: 'T_07_08', label: '07:00 ~ 08:00' },
  { value: 'T_08_09', label: '08:00 ~ 09:00' },
  { value: 'T_09_10', label: '09:00 ~ 10:00' },
  { value: 'T_10_11', label: '10:00 ~ 11:00' },
  { value: 'T_11_12', label: '11:00 ~ 12:00' },
  { value: 'T_12_13', label: '12:00 ~ 13:00' },
  { value: 'T_13_14', label: '13:00 ~ 14:00' },
  { value: 'T_14_15', label: '14:00 ~ 15:00' },
  { value: 'T_15_16', label: '15:00 ~ 16:00' },
  { value: 'T_16_17', label: '16:00 ~ 17:00' },
  { value: 'T_17_18', label: '17:00 ~ 18:00' },
  { value: 'T_18_19', label: '18:00 ~ 19:00' },
  { value: 'T_19_20', label: '19:00 ~ 20:00' },
  { value: 'T_20_21', label: '20:00 ~ 21:00' },
  { value: 'T_21_22', label: '21:00 ~ 22:00' },
  { value: 'T_22_23', label: '22:00 ~ 23:00' },
  { value: 'T_23_00', label: '23:00 ~ 00:00' },
] as const

export type ProductionStartTimeType =
  (typeof PRODUCTION_START_TIME_OPTIONS)[number]['value']

/** Dropdown options (label 표시, value는 백엔드 Enum 키) */
export const productionTimes = PRODUCTION_START_TIME_OPTIONS.map((option) => ({
  label: option.label,
  value: option.value,
}))

const PRODUCTION_START_TIME_SET = new Set<string>(
  PRODUCTION_START_TIME_OPTIONS.map((option) => option.value),
)

/** GET 응답 Enum 키를 폼 초기값으로 안전하게 바인딩 */
export function toProductionStartTimeFormValue(
  value: string | null | undefined,
): ProductionStartTimeType | '' {
  if (!value) return ''
  return PRODUCTION_START_TIME_SET.has(value)
    ? (value as ProductionStartTimeType)
    : ''
}

export function getProductionStartTimeLabel(
  value: string | null | undefined,
): string {
  if (!value) return ''
  return (
    PRODUCTION_START_TIME_OPTIONS.find((option) => option.value === value)
      ?.label ?? value
  )
}
