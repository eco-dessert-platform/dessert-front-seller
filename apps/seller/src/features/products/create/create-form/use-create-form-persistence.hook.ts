import { useEffect, useRef } from 'react'

import { useFormContext } from 'react-hook-form'

import { debounce } from '@/shared/utils/debounce'
import { toProductionStartTimeFormValue } from '@/entity/products/create/create-info/production-time.constants'

import {
  CreateFormEntryMode,
  isCreateFunnelRoute,
} from './create-funnel-navigation.utils'
import { useCreateFormSessionStore } from './create-form-session.store'
import {
  buildSessionPayload,
  getStoredSessionFormData,
} from './create-form-session.utils'
import { CreateProductForm } from './product-create.types'
import { useProductCreationStore } from './product-creation.store'

export function useCreateFormPersistence(entryMode: CreateFormEntryMode) {
  const form = useFormContext<CreateProductForm>()
  const saveSession = useCreateFormSessionStore((state) => state.saveSession)
  const hasHydrated = useRef(false)

  useEffect(() => {
    if (entryMode !== 'restore') return
    if (hasHydrated.current) return
    hasHydrated.current = true

    const formData = getStoredSessionFormData()
    if (!formData) return

    const { fileData } = useCreateFormSessionStore.getState()
    const { productDetail: savedDetail, ...formValues } = formData

    form.reset({
      ...formValues,
      productionTime: toProductionStartTimeFormValue(formValues.productionTime),
      mainImage: fileData?.mainImage ?? null,
      extraImages: fileData?.extraImages ?? [],
    } as CreateProductForm)

    const { productDetail: currentDetail, setProductDetail } =
      useProductCreationStore.getState()
    if (!currentDetail && savedDetail) {
      setProductDetail(savedDetail)
    }
  }, [entryMode, form])

  useEffect(() => {
    const persistCurrentState = () => {
      const productDetail = useProductCreationStore.getState().productDetail
      const { formData, fileData } = buildSessionPayload(
        form.getValues(),
        productDetail,
      )
      saveSession(formData, fileData)
    }

    const debouncedPersist = debounce(persistCurrentState, 300)

    const subscription = form.watch(() => {
      debouncedPersist()
    })

    return () => {
      debouncedPersist.cancel()
      subscription.unsubscribe()

      if (isCreateFunnelRoute(window.location.pathname)) {
        persistCurrentState()
      }
    }
  }, [form, saveSession])
}
