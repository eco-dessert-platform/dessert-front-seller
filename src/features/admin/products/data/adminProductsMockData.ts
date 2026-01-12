export const MOCK_PRODUCT_LIST = {
    success: true,
    code: 0,
    message: 'SUCCESS',
    result: {
        contents: [
            {
                productId: 1001,
                storeName: '그린베이커리',
                productName: '저당 통밀 식빵',
                productPrice: 6800,
                productOptions: [
                    {
                        optionId: 2001,
                        optionName: '기본',
                        price: 0,
                        stock: 120,
                        tags: ['비건', '저지방'],
                    },
                    {
                        optionId: 2002,
                        optionName: '슬라이스',
                        price: 500,
                        stock: 80,
                        tags: ['비건'],
                    },
                ],
            },
            {
                productId: 1002,
                storeName: '달빛빵집',
                productName: '노밀가루 프로틴 식빵 식단조절빵 식사빵 큐브식빵',
                productPrice: 4700,
                productOptions: [
                    {
                        optionId: 2003,
                        optionName: '초코 큐브식빵',
                        price: 4700,
                        stock: 1,
                        tags: [
                            '글루텐프리',
                            '비건',
                            '저당',
                            '고단백',
                            '저지방',
                        ],
                    },
                    {
                        optionId: 2004,
                        optionName: '프로틴스콘',
                        price: 9800,
                        stock: 0,
                        tags: ['글루텐프리', '고단백', '저지방'],
                    },
                ],
            },
            {
                productId: 1003,
                storeName: '언제나 빵집',
                productName: '프로틴빵 노밀가루 글루텐프리 식단관리 단백질빵',
                productPrice: 5500,
                productOptions: [
                    {
                        optionId: 2005,
                        optionName: '기본',
                        price: 5500,
                        stock: 1,
                        tags: [
                            '글루텐프리',
                            '비건',
                            '저당',
                            '고단백',
                            '저지방',
                        ],
                    },
                ],
            },
        ],
        page: 0,
        size: 20,
        totalElements: 152,
        totalPages: 8,
    },
}
