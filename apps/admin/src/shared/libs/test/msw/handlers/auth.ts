import { HttpResponse, http } from 'msw'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export const authHandlers = [
  http.post(`${BASE_URL}/api/v1/admin/login`, () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: 'OK',
      fieldErrors: [],
      result: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      },
    })
  }),

  http.post(`${BASE_URL}/api/v1/admin/logout`, () => {
    return HttpResponse.json({
      success: true,
      code: 200,
      message: 'OK',
    })
  }),
]
