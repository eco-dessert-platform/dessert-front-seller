export const getFileNameFromContentDisposition = (
  contentDisposition?: string,
  fallback = 'download.xlsx',
) => {
  if (!contentDisposition) {
    return fallback
  }

  const match = contentDisposition.match(
    /filename\*?=(?:UTF-8''|")?([^";\n]+)/i,
  )

  return match?.[1]
    ? decodeURIComponent(match[1].replace(/"/g, ''))
    : fallback
}

export const triggerFileDownload = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
