import { toast } from '@dessert/ui'

export const sellerInfoToast = {
  storeNameChangeSuccess: () =>
    toast.success(
      '스토어명 변경 신청을 완료했어요',
      '검토 후 변경까지 1~4일정도 소요될 수 있어요',
    ),

  storeNameChangeDuplicateError: () =>
    toast.error('중복된 스토어명이에요', '스토어명을 다시 작성해주세요'),

  storeNameCheckError: () =>
    toast.error('중복 확인 중 문제가 발생했어요', '잠시 후 다시 시도해주세요'),

  storeNameChangeError: () =>
    toast.error('스토어명 변경 신청에 실패했어요', '잠시 후 다시 시도해주세요'),

  accountInfoChangeSuccess: () => toast.success('계좌정보 변경을 완료했어요'),

  accountInfoChangeValidationError: () =>
    toast.error(
      '해당 계좌 정보로 변경할 수 없어요',
      '예금주명이 대표자명 혹은 사업자명과 일치하지 않아요',
    ),

  accountInfoVerificationError: () =>
    toast.error(
      '계좌 인증 도중 문제가 발생했어요',
      '잠시 후 다시 시도해주세요',
    ),

  editCancelSuccess: () => toast.success('수정이 취소되었어요'),

  saveSuccess: () => toast.success('변경사항이 저장되었어요'),

  saveValidationError: () => toast.error('작성되지 않은 항목이 있어요'),

  storeInfoSaveError: () =>
    toast.error('스토어 정보 수정에 실패했어요', '잠시 후 다시 시도해주세요'),
}
