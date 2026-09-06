
import { Button } from '@dessert/ui'
import { useFormContext, useWatch } from 'react-hook-form'

import {
  CreateProductForm,
  hasCreateFormInput,
  useProductCreationStore,
  useSubmitCreateForm,
} from '@/features/products/create/create-form'

import { useCreateDraft } from '../create-draft'

interface ProductFooterProps {
  onPreview: () => void
}

export const CreateFooter = ({ onPreview }: ProductFooterProps) => {
  const { handleSaveDraft } = useCreateDraft()
  const { handleSubmit, isPending } = useSubmitCreateForm()
  const {
    control,
    formState: { isDirty },
  } = useFormContext<CreateProductForm>()
  const values = useWatch({ control }) as CreateProductForm
  const { productDetail } = useProductCreationStore()

  const hasAnyInput = hasCreateFormInput(values, productDetail, isDirty)

  return (
    <div className="sticky bottom-0 left-0 z-20 -mb-36 -ml-[90px] flex w-[calc(100%+180px)] justify-end gap-12 border-t border-t-gray-200 bg-white px-[90px] py-24">
      <Button
        title="미리보기"
        variant="primary-outlined"
        size="lg"
        onClick={onPreview}
      />
      <Button
        title="임시저장"
        variant="primary-outlined"
        size="lg"
        disabled={!hasAnyInput || isPending}
        onClick={handleSaveDraft}
      />
      <Button
        title="저장하기"
        variant="primary-filled"
        size="lg"
        disabled={!hasAnyInput || isPending}
        onClick={handleSubmit}
      />
    </div>
  )
}
