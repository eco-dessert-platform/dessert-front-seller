import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Text,
  toast,
} from '@dessert/ui'

import { IAccountVerification } from '@/entity/settlement/charge/entities'
import { useWithdrawalMutation } from '@/features/settlement/charge/use-withdrawal-mutation'

interface ChargeWithdrawModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chargeBalance?: number
  accountVerification?: IAccountVerification
}

const ChargeWithdrawModal = ({
  open,
  onOpenChange,
  chargeBalance = 0,
  accountVerification,
}: ChargeWithdrawModalProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const { mutate: requestWithdrawal, isPending } = useWithdrawalMutation()

  const amount = Number(withdrawAmount)
  const isValidAmount =
    withdrawAmount !== '' &&
    !Number.isNaN(amount) &&
    amount > 0 &&
    amount <= chargeBalance

  const handleWithdraw = () => {
    if (!accountVerification) {
      toast.error('정산 계좌 정보가 없습니다.', undefined, {
        position: 'bottom-right',
      })
      return
    }

    if (!isValidAmount) {
      toast.error('출금 금액을 확인해주세요.', undefined, {
        position: 'bottom-right',
      })
      return
    }

    requestWithdrawal(
      {
        withdrawalAmount: amount,
        bankName: accountVerification.bankCode,
        accountHolder: accountVerification.accountHolder,
        accountNumber: accountVerification.accountNumber,
      },
      {
        onSuccess: () => {
          toast.success('출금 신청이 완료되었어요.', undefined, {
            position: 'bottom-right',
          })
          setWithdrawAmount('')
          onOpenChange(false)
        },
        onError: (error) => {
          toast.error(
            error instanceof Error ? error.message : '출금 신청에 실패했습니다.',
            undefined,
            { position: 'bottom-right' },
          )
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[406px] sm:max-w-[406px]">
        <DialogHeader>
          <DialogTitle showCloseButton>충전금 출금</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-16">
          <div className="flex items-center justify-between">
            <Text as="p" variant="title16-m">
              출금 금액
            </Text>
            <div className="flex items-center">
              <Input
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-[150px] rounded-8 px-10 py-6 text-right"
              />
              <Text as="span" variant="title16-m">
                원
              </Text>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Text as="span" variant="title16-m">
              충전금 잔액
            </Text>
            <Text as="span" variant="title16-sb" className="text-right">
              {chargeBalance.toLocaleString()} 원
            </Text>
          </div>
        </div>

        <div className="my-6 h-px bg-gray-200" />

        <div className="space-y-16">
          <Text as="p" variant="title16-sb">
            정산 계좌 정보
          </Text>

          <div className="flex items-center justify-between gap-8">
            <Text as="span" variant="title16-m">
              은행명
            </Text>
            <Text as="span" variant="title16-sb" className="text-right">
              {accountVerification?.bankCode ?? '-'}
            </Text>
          </div>

          <div className="flex items-center justify-between gap-8">
            <Text as="span" variant="title16-m">
              예금주
            </Text>
            <Text as="span" variant="title16-sb" className="text-right">
              {accountVerification?.accountHolder ?? '-'}
            </Text>
          </div>

          <div className="flex items-center justify-between gap-8">
            <Text as="span" variant="title16-m">
              계좌번호
            </Text>
            <Text as="span" variant="title16-sb" className="text-right">
              {accountVerification?.accountNumber ?? '-'}
            </Text>
          </div>
        </div>

        <DialogFooter className="gap-8">
          <DialogClose asChild>
            <Button
              title="취소"
              variant="secondary-outlined"
              size="sm"
              className="h-32 min-w-[80px] rounded-8"
              disabled={isPending}
            />
          </DialogClose>
          <Button
            title="출금"
            variant="primary-filled"
            size="sm"
            className="h-32 min-w-[96px] rounded-8"
            disabled={isPending}
            onClick={handleWithdraw}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ChargeWithdrawModal
