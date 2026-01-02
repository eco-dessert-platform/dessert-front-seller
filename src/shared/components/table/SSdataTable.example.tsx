import { createColumnHelper } from '@tanstack/react-table'
import { SSdataTable } from './SSdataTable'

// ============================================
// 1. 기본 데이터 타입 정의
// ============================================
interface User {
    id: string
    name: string
    email: string
    age: number
    role: string
    status: 'active' | 'inactive'
    createdAt: string
}

interface Product {
    id: string
    name: string
    category: string
    price: number
    stock: number
    supplier: string
}

interface Order {
    orderNumber: string
    customerName: string
    productName: string
    quantity: number
    totalPrice: number
    orderDate: string
}

// ============================================
// 2. 기본 사용 예시 (가장 간단한 형태)
// ============================================
export function BasicExample() {
    const columnHelper = createColumnHelper<User>()

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
        }),
        columnHelper.accessor('name', {
            header: '이름',
        }),
        columnHelper.accessor('email', {
            header: '이메일',
        }),
        columnHelper.accessor('age', {
            header: '나이',
        }),
        columnHelper.accessor('role', {
            header: '역할',
        }),
    ]

    const data: User[] = [
        {
            id: '1',
            name: '홍길동',
            email: 'hong@example.com',
            age: 30,
            role: '관리자',
            status: 'active',
            createdAt: '2024-01-01',
        },
        {
            id: '2',
            name: '김철수',
            email: 'kim@example.com',
            age: 25,
            role: '사용자',
            status: 'active',
            createdAt: '2024-01-02',
        },
        {
            id: '3',
            name: '이영희',
            email: 'lee@example.com',
            age: 28,
            role: '사용자',
            status: 'inactive',
            createdAt: '2024-01-03',
        },
    ]

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">기본 사용 예시</h2>
            <SSdataTable columns={columns} data={data} />
        </div>
    )
}

// ============================================
// 3. 페이지네이션 사용 예시
// ============================================
export function PaginationExample() {
    const columnHelper = createColumnHelper<User>()

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
        }),
        columnHelper.accessor('name', {
            header: '이름',
        }),
        columnHelper.accessor('email', {
            header: '이메일',
        }),
        columnHelper.accessor('age', {
            header: '나이',
        }),
    ]

    // 더 많은 데이터 생성
    const data: User[] = Array.from({ length: 50 }, (_, i) => ({
        id: String(i + 1),
        name: `사용자 ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: 20 + (i % 30),
        role: i % 2 === 0 ? '관리자' : '사용자',
        status: i % 3 === 0 ? 'inactive' : 'active',
        createdAt: `2024-01-${String(i + 1).padStart(2, '0')}`,
    }))

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">페이지네이션 사용 예시</h2>
            <SSdataTable
                columns={columns}
                data={data}
                pagination={{
                    enabled: true,
                    pageSize: 10,
                    position: 'bottom', // 'top' | 'bottom' | 'both'
                    align: 'right', // 'left' | 'center' | 'right'
                    showPageNumbers: true,
                    maxVisiblePages: 5,
                }}
            />
        </div>
    )
}

// ============================================
// 4. 검색 기능 사용 예시
// ============================================
export function SearchExample() {
    const columnHelper = createColumnHelper<User>()

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
        }),
        columnHelper.accessor('name', {
            header: '이름',
        }),
        columnHelper.accessor('email', {
            header: '이메일',
        }),
        columnHelper.accessor('role', {
            header: '역할',
        }),
    ]

    const data: User[] = Array.from({ length: 30 }, (_, i) => ({
        id: String(i + 1),
        name: `사용자 ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: 20 + (i % 30),
        role: i % 2 === 0 ? '관리자' : '사용자',
        status: i % 3 === 0 ? 'inactive' : 'active',
        createdAt: `2024-01-${String(i + 1).padStart(2, '0')}`,
    }))

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">검색 기능 사용 예시</h2>
            <SSdataTable
                columns={columns}
                data={data}
                search={{
                    columns: ['name', 'email', 'role'], // 검색 대상 컬럼
                    position: 'top', // 'top' | 'bottom' | 'both'
                    align: 'left', // 'left' | 'center' | 'right'
                    placeholder: '이름, 이메일, 역할로 검색...',
                }}
            />
        </div>
    )
}

// ============================================
// 5. 페이지네이션 + 검색 조합 예시
// ============================================
export function PaginationAndSearchExample() {
    const columnHelper = createColumnHelper<Product>()

    const columns = [
        columnHelper.accessor('id', {
            header: '상품 ID',
        }),
        columnHelper.accessor('name', {
            header: '상품명',
        }),
        columnHelper.accessor('category', {
            header: '카테고리',
        }),
        columnHelper.accessor('price', {
            header: '가격',
            cell: (info) => `${info.getValue().toLocaleString()}원`,
        }),
        columnHelper.accessor('stock', {
            header: '재고',
        }),
        columnHelper.accessor('supplier', {
            header: '공급업체',
        }),
    ]

    const data: Product[] = Array.from({ length: 100 }, (_, i) => ({
        id: `PROD-${String(i + 1).padStart(3, '0')}`,
        name: `상품 ${i + 1}`,
        category: ['전자제품', '의류', '식품', '도서'][i % 4],
        price: (i + 1) * 10000,
        stock: Math.floor(Math.random() * 100),
        supplier: `공급업체 ${(i % 5) + 1}`,
    }))

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">
                페이지네이션 + 검색 조합 예시
            </h2>
            <SSdataTable
                columns={columns}
                data={data}
                pagination={{
                    enabled: true,
                    pageSize: 15,
                    position: 'both', // 상단과 하단 모두에 표시
                    align: 'center',
                    showPageNumbers: true,
                    maxVisiblePages: 7,
                }}
                search={{
                    columns: ['name', 'category', 'supplier'],
                    position: 'top',
                    align: 'right',
                    placeholder: '상품명, 카테고리, 공급업체 검색...',
                }}
            />
        </div>
    )
}

// ============================================
// 6. 셀 병합(merge) 사용 예시
// ============================================
export function MergeCellExample() {
    const columnHelper = createColumnHelper<Order>()

    const columns = [
        columnHelper.accessor('orderNumber', {
            header: '주문번호',
            meta: { merge: true }, // 같은 값이 연속되면 병합
        }),
        columnHelper.accessor('customerName', {
            header: '고객명',
            meta: { merge: true }, // 같은 값이 연속되면 병합
        }),
        columnHelper.accessor('productName', {
            header: '상품명',
        }),
        columnHelper.accessor('quantity', {
            header: '수량',
        }),
        columnHelper.accessor('totalPrice', {
            header: '총액',
            cell: (info) => `${info.getValue().toLocaleString()}원`,
        }),
        columnHelper.accessor('orderDate', {
            header: '주문일',
        }),
    ]

    const data: Order[] = [
        {
            orderNumber: 'ORD-001',
            customerName: '홍길동',
            productName: '노트북',
            quantity: 1,
            totalPrice: 1200000,
            orderDate: '2024-01-01',
        },
        {
            orderNumber: 'ORD-001',
            customerName: '홍길동',
            productName: '마우스',
            quantity: 2,
            totalPrice: 50000,
            orderDate: '2024-01-01',
        },
        {
            orderNumber: 'ORD-001',
            customerName: '홍길동',
            productName: '키보드',
            quantity: 1,
            totalPrice: 150000,
            orderDate: '2024-01-01',
        },
        {
            orderNumber: 'ORD-002',
            customerName: '김철수',
            productName: '모니터',
            quantity: 1,
            totalPrice: 300000,
            orderDate: '2024-01-02',
        },
        {
            orderNumber: 'ORD-002',
            customerName: '김철수',
            productName: '스피커',
            quantity: 2,
            totalPrice: 100000,
            orderDate: '2024-01-02',
        },
        {
            orderNumber: 'ORD-003',
            customerName: '이영희',
            productName: '태블릿',
            quantity: 1,
            totalPrice: 800000,
            orderDate: '2024-01-03',
        },
    ]

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">셀 병합 사용 예시</h2>
            <p className="mb-4 text-sm text-gray-600">
                주문번호와 고객명이 같은 경우 자동으로 병합됩니다.
            </p>
            <SSdataTable columns={columns} data={data} />
        </div>
    )
}

// ============================================
// 7. 가상화(Virtualization) 사용 예시
// ============================================
export function VirtualizationExample() {
    const columnHelper = createColumnHelper<User>()

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
        }),
        columnHelper.accessor('name', {
            header: '이름',
        }),
        columnHelper.accessor('email', {
            header: '이메일',
        }),
        columnHelper.accessor('age', {
            header: '나이',
        }),
        columnHelper.accessor('role', {
            header: '역할',
        }),
        columnHelper.accessor('status', {
            header: '상태',
            cell: (info) => (
                <span
                    className={
                        info.getValue() === 'active'
                            ? 'text-green-600'
                            : 'text-red-600'
                    }
                >
                    {info.getValue() === 'active' ? '활성' : '비활성'}
                </span>
            ),
        }),
    ]

    // 대량의 데이터 생성 (가상화가 유용한 경우)
    const data: User[] = Array.from({ length: 10000 }, (_, i) => ({
        id: String(i + 1),
        name: `사용자 ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: 20 + (i % 30),
        role: i % 2 === 0 ? '관리자' : '사용자',
        status: i % 3 === 0 ? 'inactive' : 'active',
        createdAt: `2024-01-${String((i % 30) + 1).padStart(2, '0')}`,
    }))

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">가상화 사용 예시</h2>
            <p className="mb-4 text-sm text-gray-600">
                10,000개의 행을 효율적으로 렌더링합니다.
            </p>
            <SSdataTable
                columns={columns}
                data={data}
                virtualization={{
                    enabled: true,
                    rowHeight: 52, // 각 행의 높이 (px)
                    containerHeight: 600, // 컨테이너 높이 (px)
                    overscan: 5, // 추가 렌더링할 행 수
                }}
                search={{
                    columns: ['name', 'email'],
                    position: 'top',
                    placeholder: '이름 또는 이메일 검색...',
                }}
            />
        </div>
    )
}

// ============================================
// 8. 커스텀 셀 렌더링 예시
// ============================================
export function CustomCellExample() {
    const columnHelper = createColumnHelper<User>()

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
        }),
        columnHelper.accessor('name', {
            header: '이름',
            cell: (info) => (
                <span className="font-semibold text-blue-600">
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor('email', {
            header: '이메일',
            cell: (info) => (
                <a
                    href={`mailto:${info.getValue()}`}
                    className="text-blue-500 hover:underline"
                >
                    {info.getValue()}
                </a>
            ),
        }),
        columnHelper.accessor('age', {
            header: '나이',
            cell: (info) => {
                const age = info.getValue()
                return (
                    <span
                        className={
                            age >= 30
                                ? 'font-bold text-red-600'
                                : 'text-gray-700'
                        }
                    >
                        {age}세
                    </span>
                )
            },
        }),
        columnHelper.accessor('status', {
            header: '상태',
            cell: (info) => {
                const status = info.getValue()
                return (
                    <span
                        className={`rounded-full px-2 py-1 text-xs ${
                            status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {status === 'active' ? '활성' : '비활성'}
                    </span>
                )
            },
        }),
        columnHelper.accessor('createdAt', {
            header: '생성일',
            cell: (info) => {
                const date = new Date(info.getValue())
                return date.toLocaleDateString('ko-KR')
            },
        }),
    ]

    const data: User[] = [
        {
            id: '1',
            name: '홍길동',
            email: 'hong@example.com',
            age: 35,
            role: '관리자',
            status: 'active',
            createdAt: '2024-01-01',
        },
        {
            id: '2',
            name: '김철수',
            email: 'kim@example.com',
            age: 25,
            role: '사용자',
            status: 'active',
            createdAt: '2024-01-02',
        },
        {
            id: '3',
            name: '이영희',
            email: 'lee@example.com',
            age: 28,
            role: '사용자',
            status: 'inactive',
            createdAt: '2024-01-03',
        },
    ]

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">커스텀 셀 렌더링 예시</h2>
            <SSdataTable columns={columns} data={data} />
        </div>
    )
}

// ============================================
// 9. 정렬 기능 사용 예시 (기본 제공)
// ============================================
export function SortingExample() {
    const columnHelper = createColumnHelper<User>()

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
            enableSorting: true, // 정렬 활성화
        }),
        columnHelper.accessor('name', {
            header: '이름',
            enableSorting: true,
        }),
        columnHelper.accessor('email', {
            header: '이메일',
            enableSorting: true,
        }),
        columnHelper.accessor('age', {
            header: '나이',
            enableSorting: true,
        }),
        columnHelper.accessor('role', {
            header: '역할',
            enableSorting: true,
        }),
    ]

    const data: User[] = Array.from({ length: 50 }, (_, i) => ({
        id: String(i + 1),
        name: `사용자 ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: 20 + (i % 30),
        role: i % 2 === 0 ? '관리자' : '사용자',
        status: i % 3 === 0 ? 'inactive' : 'active',
        createdAt: `2024-01-${String(i + 1).padStart(2, '0')}`,
    }))

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">정렬 기능 사용 예시</h2>
            <p className="mb-4 text-sm text-gray-600">
                컬럼 헤더를 클릭하면 정렬됩니다.
            </p>
            <SSdataTable
                columns={columns}
                data={data}
                pagination={{
                    enabled: true,
                    pageSize: 10,
                }}
            />
        </div>
    )
}

// ============================================
// 10. 모든 기능 통합 예시
// ============================================
export function FullFeatureExample() {
    const columnHelper = createColumnHelper<Order>()

    const columns = [
        columnHelper.accessor('orderNumber', {
            header: '주문번호',
            enableSorting: true,
            meta: { merge: true },
        }),
        columnHelper.accessor('customerName', {
            header: '고객명',
            enableSorting: true,
            meta: { merge: true },
        }),
        columnHelper.accessor('productName', {
            header: '상품명',
            enableSorting: true,
        }),
        columnHelper.accessor('quantity', {
            header: '수량',
            enableSorting: true,
            cell: (info) => (
                <span className="text-center font-semibold">
                    {info.getValue()}개
                </span>
            ),
        }),
        columnHelper.accessor('totalPrice', {
            header: '총액',
            enableSorting: true,
            cell: (info) => (
                <span className="font-bold text-green-600">
                    {info.getValue().toLocaleString()}원
                </span>
            ),
        }),
        columnHelper.accessor('orderDate', {
            header: '주문일',
            enableSorting: true,
            cell: (info) => {
                const date = new Date(info.getValue())
                return date.toLocaleDateString('ko-KR')
            },
        }),
    ]

    const data: Order[] = Array.from({ length: 200 }, (_, i) => {
        const orderNum = Math.floor(i / 3) + 1
        const products = ['노트북', '마우스', '키보드', '모니터', '스피커']
        return {
            orderNumber: `ORD-${String(orderNum).padStart(3, '0')}`,
            customerName: `고객 ${orderNum}`,
            productName: products[i % products.length],
            quantity: Math.floor(Math.random() * 5) + 1,
            totalPrice: (Math.floor(Math.random() * 5) + 1) * 100000,
            orderDate: `2024-01-${String((i % 30) + 1).padStart(2, '0')}`,
        }
    })

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">모든 기능 통합 예시</h2>
            <p className="mb-4 text-sm text-gray-600">
                페이지네이션, 검색, 정렬, 셀 병합이 모두 적용된 예시입니다.
            </p>
            <SSdataTable
                columns={columns}
                data={data}
                pagination={{
                    enabled: true,
                    pageSize: 20,
                    position: 'both',
                    align: 'center',
                    showPageNumbers: true,
                    maxVisiblePages: 5,
                }}
                search={{
                    columns: ['orderNumber', 'customerName', 'productName'],
                    position: 'top',
                    align: 'left',
                    placeholder: '주문번호, 고객명, 상품명 검색...',
                }}
            />
        </div>
    )
}

