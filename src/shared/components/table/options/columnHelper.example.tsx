import { SSdataTable } from '../SSdataTable'
import {
    createColumn,
    createColumns,
    createSimpleColumn,
    ColumnOptions,
} from './columnHelper'

// ============================================
// 데이터 타입 정의
// ============================================
interface User {
    id: string
    name: string
    email: string
    age: number
    role: string
    salary: number
    status: 'active' | 'inactive'
    createdAt: string
}

// ============================================
// 예제 1: createColumn 사용 (개별 컬럼 생성)
// ============================================
export function CreateColumnExample() {
    const columns = [
        createColumn<User>({
            header: 'ID',
            accessorKey: 'id',
        }),
        createColumn<User>({
            header: '이름',
            accessorKey: 'name',
            enableSorting: true,
        }),
        createColumn<User>({
            header: '이메일',
            accessorKey: 'email',
            cellAlign: 'left',
        }),
        createColumn<User>({
            header: '나이',
            accessorKey: 'age',
            enableSorting: true,
            cellAlign: 'right',
        }),
        createColumn<User>({
            header: '급여',
            accessorKey: 'salary',
            format: 'currency',
            region: 'kr',
            enableSorting: true,
            cellAlign: 'right',
        }),
    ]

    const data: User[] = [
        {
            id: '1',
            name: '홍길동',
            email: 'hong@example.com',
            age: 30,
            role: '관리자',
            salary: 5000000,
            status: 'active',
            createdAt: '2024-01-01',
        },
        {
            id: '2',
            name: '김철수',
            email: 'kim@example.com',
            age: 25,
            role: '사용자',
            salary: 3000000,
            status: 'active',
            createdAt: '2024-01-02',
        },
    ]

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">createColumn 사용 예시</h2>
            <SSdataTable columns={columns} data={data} />
        </div>
    )
}

// ============================================
// 예제 2: createColumns 사용 (여러 컬럼 한번에 생성)
// ============================================
export function CreateColumnsExample() {
    const columnOptions: ColumnOptions<User>[] = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: '이름',
            accessorKey: 'name',
            enableSorting: true,
        },
        {
            header: '이메일',
            accessorKey: 'email',
        },
        {
            header: '나이',
            accessorKey: 'age',
            enableSorting: true,
            cellAlign: 'right',
        },
        {
            header: '급여',
            accessorKey: 'salary',
            format: 'currency',
            region: 'kr',
            enableSorting: true,
            cellAlign: 'right',
        },
        {
            header: '생성일',
            accessorKey: 'createdAt',
            format: 'date',
            region: 'kr',
        },
    ]

    const columns = createColumns<User>(columnOptions)

    const data: User[] = [
        {
            id: '1',
            name: '홍길동',
            email: 'hong@example.com',
            age: 30,
            role: '관리자',
            salary: 5000000,
            status: 'active',
            createdAt: '2024-01-01',
        },
        {
            id: '2',
            name: '김철수',
            email: 'kim@example.com',
            age: 25,
            role: '사용자',
            salary: 3000000,
            status: 'active',
            createdAt: '2024-01-02',
        },
    ]

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">createColumns 사용 예시</h2>
            <SSdataTable columns={columns} data={data} />
        </div>
    )
}

// ============================================
// 예제 3: createSimpleColumn 사용 (간단한 컬럼 생성)
// ============================================
export function CreateSimpleColumnExample() {
    const columns = [
        createSimpleColumn<User>('id', 'ID'),
        createSimpleColumn<User>('name', '이름', {
            enableSorting: true,
        }),
        createSimpleColumn<User>('email', '이메일'),
        createSimpleColumn<User>('age', '나이', {
            enableSorting: true,
            cellAlign: 'right',
        }),
        createSimpleColumn<User>('salary', '급여', {
            format: 'currency',
            region: 'kr',
            enableSorting: true,
            cellAlign: 'right',
        }),
    ]

    const data: User[] = [
        {
            id: '1',
            name: '홍길동',
            email: 'hong@example.com',
            age: 30,
            role: '관리자',
            salary: 5000000,
            status: 'active',
            createdAt: '2024-01-01',
        },
        {
            id: '2',
            name: '김철수',
            email: 'kim@example.com',
            age: 25,
            role: '사용자',
            salary: 3000000,
            status: 'active',
            createdAt: '2024-01-02',
        },
    ]

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">
                createSimpleColumn 사용 예시
            </h2>
            <SSdataTable columns={columns} data={data} />
        </div>
    )
}

// ============================================
// 예제 4: 커스텀 셀 렌더링
// ============================================
export function CustomCellExample() {
    const columns = [
        createColumn<User>({
            header: 'ID',
            accessorKey: 'id',
        }),
        createColumn<User>({
            header: '이름',
            accessorKey: 'name',
        }),
        createColumn<User>({
            header: '상태',
            accessorKey: 'status',
            customCell: (value: User['status'], row: User) => {
                return (
                    <span
                        className={`rounded-full px-2 py-1 text-xs ${
                            value === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {value === 'active' ? '활성' : '비활성'}
                    </span>
                )
            },
        }),
        createColumn<User>({
            header: '급여',
            accessorKey: 'salary',
            format: 'currency',
            region: 'kr',
            cellAlign: 'right',
        }),
    ]

    const data: User[] = [
        {
            id: '1',
            name: '홍길동',
            email: 'hong@example.com',
            age: 30,
            role: '관리자',
            salary: 5000000,
            status: 'active',
            createdAt: '2024-01-01',
        },
        {
            id: '2',
            name: '김철수',
            email: 'kim@example.com',
            age: 25,
            role: '사용자',
            salary: 3000000,
            status: 'inactive',
            createdAt: '2024-01-02',
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
// 예제 5: 셀 병합 기능
// ============================================
interface Order {
    orderNumber: string
    customerName: string
    productName: string
    quantity: number
    totalPrice: number
}

export function MergeCellExample() {
    const columns = [
        createColumn<Order>({
            header: '주문번호',
            accessorKey: 'orderNumber',
            merge: true, // 같은 값이 연속되면 병합
        }),
        createColumn<Order>({
            header: '고객명',
            accessorKey: 'customerName',
            merge: true,
        }),
        createColumn<Order>({
            header: '상품명',
            accessorKey: 'productName',
        }),
        createColumn<Order>({
            header: '수량',
            accessorKey: 'quantity',
            cellAlign: 'right',
        }),
        createColumn<Order>({
            header: '총액',
            accessorKey: 'totalPrice',
            format: 'currency',
            region: 'kr',
            cellAlign: 'right',
        }),
    ]

    const data: Order[] = [
        {
            orderNumber: 'ORD-001',
            customerName: '홍길동',
            productName: '노트북',
            quantity: 1,
            totalPrice: 1200000,
        },
        {
            orderNumber: 'ORD-001',
            customerName: '홍길동',
            productName: '마우스',
            quantity: 2,
            totalPrice: 50000,
        },
        {
            orderNumber: 'ORD-002',
            customerName: '김철수',
            productName: '모니터',
            quantity: 1,
            totalPrice: 300000,
        },
    ]

    return (
        <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">셀 병합 예시</h2>
            <SSdataTable columns={columns} data={data} />
        </div>
    )
}

