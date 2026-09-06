export interface Notice {
  id: number
  title: string
  createdAt: string
  modifiedAt: string
}

export interface NoticeFormValues {
  title: string
  content: string
}
