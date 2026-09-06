import type { Notice } from './notice.type'

/**
 * 목록 조회 API 연동 전까지 사용하는 임시 데이터.
 * 백엔드 응답에 공지사항 ID가 포함되면 제거한다.
 */
export const noticeMockData: Notice[] = [
  {
    id: 1,
    title: '비건빵 주문 시 주의사항',
    createdAt: '2025-10-31 00:00:00',
    modifiedAt: '2025-10-31 00:00:00',
  },
  {
    id: 2,
    title: '개인정보 보호 시 주의사항',
    createdAt: '2025-10-31 00:00:00',
    modifiedAt: '2025-10-31 00:00:00',
  },
  {
    id: 3,
    title: '서버 점검 일정 안내',
    createdAt: '2025-10-31 00:00:00',
    modifiedAt: '2025-10-31 00:00:00',
  },
]
