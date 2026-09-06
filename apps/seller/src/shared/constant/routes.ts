export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  CALLBACK: {
    SOCIAL: '/callback/social',
  },
  REGISTER: {
    DEFAULT: '/register',
    VERIFICATION: '/register/verification',
    STORE_INFO: '/register/store-info',
    COMPLETE: '/register/complete',
  },
  ORDERS: {
    ALL: '/orders',
    COMPLETED: '/orders/completed',
  },
  PRODUCTS: {
    ALL: '/products',
    CREATE: '/products/create',
    CREATE_DETAIL: '/products/create/detail',
    EDIT: '/products/:boardId/edit',
    EDIT_DETAIL: '/products/:boardId/edit/detail',
    edit: (boardId: number | string) => `/products/${boardId}/edit`,
    editDetail: (boardId: number | string) =>
      `/products/${boardId}/edit/detail`,
  },
  SETTLEMENTS: {
    ALL: '/settlements',
    CHARGE: '/settlements/charge',
    WITHHELD: '/settlements/withheld',
    VAT_REPORT: '/settlements/vat-report',
    TAX_INVOICE: '/settlements/tax-invoice',
  },
  STATISTICS: {
    SALES_ANALYTICS: '/statistics/sales-analytics',
  },
  INFO: {
    CHANGE: '/seller/info',
  },
} as const
