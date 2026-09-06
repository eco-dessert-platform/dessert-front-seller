export type ExistingImageRef = {
  kind: 'existing'
  url: string
}

export type ExtraImageFileItem = {
  id: string
  kind: 'file'
  file: File
}

export type ExtraImageExistingItem = {
  id: string
  kind: 'existing'
  url: string
}

export type ExtraImageItem = ExtraImageFileItem | ExtraImageExistingItem

export type MainImageValue = File | ExistingImageRef | null

export type ThumbnailFormType = {
  mainImage: MainImageValue
  extraImages: ExtraImageItem[]
}

export function isExistingImageRef(
  value: MainImageValue | ExtraImageItem | undefined | null,
): value is ExistingImageRef | ExtraImageExistingItem {
  return (
    !!value &&
    typeof value === 'object' &&
    'kind' in value &&
    value.kind === 'existing'
  )
}

export function isExtraImageFileItem(
  value: ExtraImageItem,
): value is ExtraImageFileItem {
  return value.kind === 'file'
}

export function getImagePreviewSrc(
  value: MainImageValue | ExtraImageItem | null | undefined,
): string | null {
  if (!value) return null
  if (value instanceof File) return null // caller should createObjectURL
  if (isExistingImageRef(value)) return value.url
  if ('file' in value && value.file instanceof File) return null
  return null
}
