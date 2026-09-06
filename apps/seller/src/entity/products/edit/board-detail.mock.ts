import appleImage from '@/assets/images/apple-120x120.png'
import characterLogo from '@/assets/images/character-logo.png'
import loginImage from '@/assets/images/login.png'

import type { ProvisionalSellerBoardDetail } from './board-detail.type'

/**
 * TODO(seller-board-detail-api):
 * 백엔드 seller 상품 단건 조회 API 구현 후 `false`로 바꾸거나
 * 이 파일과 api 분기를 제거하세요.
 *
 * true  → mock 반환 (실제 GET 요청 없음)
 * false → GET /api/v1/seller/boards/{boardId}
 */
export const USE_PRODUCT_EDIT_MOCK = true

/**
 * 수정 Form 전 영역 hydration 확인용 mock.
 * 응답 shape는 ProvisionalSellerBoardDetail(mapper 입력)과 동일합니다.
 */
export function getMockSellerBoardDetail(
  boardId: number,
): ProvisionalSellerBoardDetail {
  return {
    boardId,
    title: '글루텐프리 쌀식빵 (목데이터)',
    isFresh: true,
    productionStartTime: 'T_09_10',
    price: 12000,
    discountType: 'AMOUNT',
    discountValue: 1000,
    deliveryCondition: 'conditionalFree',
    deliveryCompany: 'cj',
    deliveryFee: 3000,
    freeShippingConditions: 30000,
    thumbnailUrl: appleImage,
    subImageUrls: [loginImage, characterLogo],
    boardDetailContent: [
      '<h2>상품 상세 소개</h2>',
      '<p>수정 화면 확인용 <strong>목 상세 HTML</strong>입니다.</p>',
      '<p>쌀가루로 만든 부드러운 식빵으로, 아침 식사와 간식에 잘 어울립니다.</p>',
      '<ul><li>냉장 보관 권장</li><li>개봉 후 가급적 빠르게 섭취</li></ul>',
    ].join(''),
    productInfoNotice: {
      productName: '글루텐프리 쌀식빵',
      foodType: '빵류',
      manufacturer: '빵그리 베이커리',
      originLocation: '서울특별시 성동구',
      manufactureDate: '주문 후 제작',
      expirationDate: '제조일로부터 3일',
      packagingContents: '1봉 (400g)',
      packagingQuantityUnit: '1개',
      rawMaterialName: '쌀가루(국내산), 계란, 버터, 소금',
      nutritionInfo: '총 중량 400g / 1회 제공량 50g',
      transgenic: '해당없음',
      customerWarning: '알레르기 유발물질: 계란, 우유 함유',
      importFood: '해당없음',
    },
    products: [
      {
        productId: 101,
        title: '플레인 400g',
        category: 'BREAD',
        plusPriceWithBoardPrice: 0,
        stock: 25,
        dietaryTags: {
          glutenFreeTag: true,
          highProteinTag: false,
          sugarFreeTag: false,
          veganTag: false,
          ketogenicTag: false,
        },
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        nutritionInfo: {
          totalWeight: 400,
          servingSize: 50,
          carbohydrates: 42,
          sugars: 3,
          protein: 6,
          fat: 4,
          calories: 220,
        },
      },
      {
        productId: 102,
        title: '비건 쌀식빵 400g',
        category: 'BREAD',
        plusPriceWithBoardPrice: 1500,
        stock: 8,
        dietaryTags: {
          glutenFreeTag: true,
          highProteinTag: false,
          sugarFreeTag: true,
          veganTag: true,
          ketogenicTag: false,
        },
        availability: {
          monday: true,
          tuesday: false,
          wednesday: true,
          thursday: false,
          friday: true,
          saturday: true,
          sunday: false,
        },
        nutritionInfo: {
          totalWeight: 400,
          servingSize: 50,
          carbohydrates: 40,
          sugars: 2,
          protein: 5,
          fat: 3.5,
          calories: 200,
        },
      },
    ],
  }
}
