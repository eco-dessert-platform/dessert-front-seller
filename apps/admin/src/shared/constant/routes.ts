export const ROUTES = {
  HOME: '/',
  STORE: {
    MEMBER_APPROVAL: '/store/member-approval',
    NAME_CHANGE_APPROVAL: '/store/name-change-approval',
    REGISTRATION: '/store/registration',
  },
  PRODUCTS: {
    UPLOAD_APPROVAL: '/products/upload-approval',
    ALL: '/products/all',
  },
  HOMEPAGE: {
    NOTICE: '/homepage/notice',
    NOTICE_CREATE: '/homepage/notice/register',
    NOTICE_EDIT: '/homepage/notice/:noticeId/edit',
    noticeEdit: (noticeId: number | string) =>
      `/homepage/notice/${noticeId}/edit`,
  },
  LOGIN: '/login',
} as const
