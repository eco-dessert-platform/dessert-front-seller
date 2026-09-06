import { HttpResponse, http } from 'msw'

import { server } from '@/shared/libs/test/msw/server'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
const LOGIN_URL = `${BASE_URL}/api/v1/admin/login`

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('MSW 서버', () => {
  it('기본 핸들러: 로그인 요청에 mock 토큰을 반환한다', async () => {
    const res = await fetch(LOGIN_URL, { method: 'POST' })
    const data = await res.json()

    expect(data.result.accessToken).toBe('mock-access-token')
  })

  it('핸들러 오버라이드: 로그인 실패 응답을 반환한다', async () => {
    server.use(
      http.post(LOGIN_URL, () =>
        HttpResponse.json({ message: '인증 실패' }, { status: 401 }),
      ),
    )

    const res = await fetch(LOGIN_URL, { method: 'POST' })

    expect(res.status).toBe(401)
  })
})
