import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@dessert/ui'

interface NoticeDeleteConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  disabled?: boolean
}

export const NoticeDeleteConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  disabled = false,
}: NoticeDeleteConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !disabled) onClose()
      }}
    >
      <DialogContent className="w-[300px] gap-0 px-24 py-20 sm:max-w-[300px]">
        <DialogHeader className="items-center gap-0">
          <DialogTitle className="typo-heading-18-m text-gray-800">
            경고
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="pt-12 pb-24 text-center typo-title-16-r text-gray-800">
          정말 공지사항을 삭제하시나요?
        </DialogDescription>
        <DialogFooter className="grid grid-cols-2 gap-8">
          <Button
            title="취소"
            type="button"
            variant="secondary-outlined"
            onClick={onClose}
            disabled={disabled}
            className="w-full"
          />
          <Button
            title="삭제"
            type="button"
            onClick={onConfirm}
            disabled={disabled}
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
