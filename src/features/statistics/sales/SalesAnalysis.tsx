import { useEffect, useMemo, useState } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { statisticsAction } from 'src/features/statistics/statisticsReducer'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from 'src/shared/lib/shadcn/components/ui/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from 'src/shared/lib/shadcn/components/ui/chart'
import { Skeleton } from 'src/shared/lib/shadcn/components/ui/skeleton'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import {
    Line,
    Bar,
    ComposedChart,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { type DateRange } from 'react-day-picker'
import { Calendar } from 'src/shared/lib/shadcn/components/ui/calendar'
import { CalendarDays, Clock } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from 'src/shared/lib/shadcn/components/ui/tooltip'

// 차트 설정
const paymentChartConfig = {
    payment: {
        label: '결제 금액',
        color: '#f8bdb3',
    },
    average: {
        label: '7일간 평균 결제 금액',
        color: '#de4525',
    },
} satisfies ChartConfig

const payerChartConfig = {
    payers: {
        label: '결제자 수',
        color: '#f8bdb3',
    },
    payments: {
        label: '결제수',
        color: '#fcded9',
    },
} satisfies ChartConfig

const weekdayChartConfig = {
    week1: {
        label: '25년 3월 1주차',
        color: '#f8bdb3',
    },
    week2: {
        label: '25년 3월 2주차',
        color: '#fef4f2',
    },
    week3: {
        label: '25년 3월 3주차',
        color: '#fcded9',
    },
    week4: {
        label: '25년 3월 4주차',
        color: '#f49b8e',
    },
    average: {
        label: '요일별 평균 결제금액',
        color: '#de4525',
    },
} satisfies ChartConfig

const refundChartConfig = {
    payment: {
        label: '결제금액',
        color: '#f8bdb3',
    },
    refund: {
        label: '환불금액',
        color: '#fcded9',
    },
    rate: {
        label: '환불비율',
        color: '#de4525',
    },
} satisfies ChartConfig

type PeriodType = 'day' | 'week' | 'month'

// 정보 아이콘 SVG (Figma 디자인 기준)
const InfoIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="12" cy="12" r="11" stroke="#E0E0E0" strokeWidth="1" fill="none" />
            <path
                d="M12 7V11M12 15H12.01"
                stroke="#212121"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="1.5" fill="#212121" />
        </svg>
    )
}

// 빈 상태 이미지 URL (Figma에서 제공)
const emptyStateImages = {
    img1: 'https://www.figma.com/api/mcp/asset/20d2446d-73b3-4dc4-87b4-40ed7d37371a',
    img2: 'https://www.figma.com/api/mcp/asset/17597b84-6d80-46e6-9740-f169d0966973',
    img3: 'https://www.figma.com/api/mcp/asset/870175ac-cd10-4afe-bd89-fde1638275aa',
    img4: 'https://www.figma.com/api/mcp/asset/077181cf-c5ba-4a10-82e5-dfa3b717f1b9',
    img5: 'https://www.figma.com/api/mcp/asset/cdc54d1c-996c-40ec-bd66-fda367ca5d46',
    img6: 'https://www.figma.com/api/mcp/asset/4545a616-992e-4874-8b2b-d3a537d193ca',
}

// 빈 상태 컴포넌트
const EmptyState = ({ message }: { message: string }) => {
    return (
        <div className="bg-white flex flex-col gap-4 items-center justify-center h-[200px] rounded-[6px]">
            <div className="flex flex-col gap-0.5 items-center justify-center w-full">
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden relative">
                    {/* 캐릭터 로고 - Figma 이미지 사용 */}
                    <div className="absolute inset-[12.5%_8.75%_12.51%_8.75%]">
                        <img alt="" className="block max-w-none size-full" src={emptyStateImages.img1} />
                    </div>
                    <div className="absolute inset-[55.36%_44.06%_41.06%_52.12%]">
                        <img alt="" className="block max-w-none size-full" src={emptyStateImages.img2} />
                    </div>
                    <div className="absolute inset-[53.84%_56.39%_42.33%_39.99%]">
                        <img alt="" className="block max-w-none size-full" src={emptyStateImages.img3} />
                    </div>
                    <div className="absolute flex inset-[62.88%_45.74%_30.95%_39.05%] items-center justify-center">
                        <div className="flex-none h-[4.94px] scale-y-[-100%] w-[12.17px]">
                            <img alt="" className="block max-w-none size-full" src={emptyStateImages.img4} />
                        </div>
                    </div>
                    <div className="absolute inset-[59.51%_50.53%_37.63%_45.02%]">
                        <img alt="" className="block max-w-none size-full" src={emptyStateImages.img5} />
                    </div>
                    <div className="absolute flex inset-[58.19%_30.21%_26.27%_54.21%] items-center justify-center">
                        <div className="flex-none h-[10.84px] rotate-[350.798deg] skew-x-[0.036deg] w-[10.861px]">
                            <img alt="" className="block max-w-none size-full" src={emptyStateImages.img6} />
                        </div>
                    </div>
                </div>
                <p className="text-title-14-r text-gray-500 text-center whitespace-pre-wrap">{message}</p>
            </div>
        </div>
    )
}

const SalesAnalysis = () => {
    const dispatch = useAppDispatch()
    const { salesAnalysis, salesSummary } = useAppSelector(
        ({ statisticsReducer }) => ({
            salesAnalysis: statisticsReducer.salesAnalysis,
            salesSummary: statisticsReducer.salesSummary,
        }),
        shallowEqual,
    )

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2025, 2, 1), // 2025.03.01
        to: new Date(2025, 2, 7), // 2025.03.07
    })
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    
    // 각 그래프별 기간 선택 상태
    const [chartPeriods, setChartPeriods] = useState<Record<string, PeriodType>>({
        payment: 'day',
        payer: 'day',
        weekday: 'day',
        refund: 'day',
    })

    useEffect(() => {
        if (dateRange?.from && dateRange?.to) {
            dispatch(
                statisticsAction.getSalesAnalysis({
                    startDate: format(dateRange.from, 'yyyy-MM-dd'),
                    endDate: format(dateRange.to, 'yyyy-MM-dd'),
                    period: chartPeriods.payment,
                }),
            )
            dispatch(
                statisticsAction.getSalesSummary({
                    startDate: format(dateRange.from, 'yyyy-MM-dd'),
                    endDate: format(dateRange.to, 'yyyy-MM-dd'),
                }),
            )
        }
    }, [dispatch, dateRange, chartPeriods.payment])

    // 일별 결제금액 데이터
    const dailyPaymentData = useMemo(() => {
        if (!salesAnalysis?.data) return []
        
        const data = Array.isArray(salesAnalysis.data) 
            ? salesAnalysis.data 
            : (salesAnalysis.data as { items?: unknown[]; data?: unknown[] })?.items || 
              (salesAnalysis.data as { items?: unknown[]; data?: unknown[] })?.data || []
        
        const mapped = data.map((item: Record<string, unknown>) => ({
            date: (item.date || item.period || item.label || '') as string,
            payment: (item.payment || item.paymentAmount || item.amount || 0) as number,
        }))
        
        // 7일간 평균 계산
        const average = mapped.length > 0
            ? mapped.reduce((sum: number, item: { payment: number }) => sum + item.payment, 0) / mapped.length
            : 0
        
        return mapped.map((item: { date: string; payment: number }) => ({
            ...item,
            average: Math.round(average),
            dateLabel: item.date.includes('-') 
                ? item.date.split('-').slice(1).join('.') 
                : item.date,
        }))
    }, [salesAnalysis?.data])

    // 일별 결제자수 및 결제수 데이터
    const dailyPayerData = useMemo(() => {
        if (!salesAnalysis?.data) return []
        
        const data = Array.isArray(salesAnalysis.data) 
            ? salesAnalysis.data 
            : (salesAnalysis.data as { items?: unknown[]; data?: unknown[] })?.items || 
              (salesAnalysis.data as { items?: unknown[]; data?: unknown[] })?.data || []
        
        return data.map((item: Record<string, unknown>) => ({
            date: (item.date || item.period || item.label || '') as string,
            payers: (item.payers || item.payerCount || 0) as number,
            payments: (item.payments || item.paymentCount || 0) as number,
            dateLabel: (item.date as string)?.includes('-') 
                ? (item.date as string).split('-').slice(1).join('.') 
                : (item.date as string),
        }))
    }, [salesAnalysis?.data])

    // 요일별 결제금액 데이터
    const weekdayData = useMemo(() => {
        // 예시 데이터 구조 - 실제 API 응답에 맞게 조정 필요
        const weekdays = ['월', '화', '수', '목', '금', '토', '일']
        return weekdays.map((day) => ({
            weekday: day,
            week1: Math.floor(Math.random() * 800000) + 200000,
            week2: Math.floor(Math.random() * 800000) + 200000,
            week3: Math.floor(Math.random() * 800000) + 200000,
            week4: Math.floor(Math.random() * 800000) + 200000,
            average: Math.floor(Math.random() * 800000) + 200000,
        }))
    }, [])

    // 일별 환불율 데이터
    const refundData = useMemo(() => {
        if (!salesAnalysis?.data) return []
        
        const data = Array.isArray(salesAnalysis.data) 
            ? salesAnalysis.data 
            : (salesAnalysis.data as { items?: unknown[]; data?: unknown[] })?.items || 
              (salesAnalysis.data as { items?: unknown[]; data?: unknown[] })?.data || []
        
        return data.map((item: Record<string, unknown>) => {
            const payment = (item.payment || item.paymentAmount || 0) as number
            const refund = (item.refund || item.refundAmount || 0) as number
            const rate = payment > 0 ? (refund / payment) * 100 : 0
            
            return {
                date: (item.date || item.period || item.label || '') as string,
                payment,
                refund,
                rate: Math.round(rate * 10) / 10,
                dateLabel: (item.date as string)?.includes('-') 
                    ? (item.date as string).split('-').slice(1).join('.') 
                    : (item.date as string),
            }
        })
    }, [salesAnalysis?.data])

    const isLoading = salesAnalysis?.loading || salesSummary?.loading

    const dateRangeText = dateRange?.from && dateRange?.to
        ? `${format(dateRange.from, 'yyyy.MM.dd', { locale: ko })} ~ ${format(dateRange.to, 'yyyy.MM.dd', { locale: ko })}`
        : '날짜를 선택하세요'

    return (
        <div className="w-full space-y-5">
            {/* 헤더 및 날짜 선택 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-heading-20-sb text-gray-900">판매분석</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className="border border-gray-300 rounded-[10px] px-3 py-2 flex items-center gap-1.5 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-title-16-r text-gray-800">{dateRangeText}</span>
                                <CalendarDays className="h-5 w-5 text-gray-800" />
                            </button>
                            {isCalendarOpen && (
                                <div className="absolute top-full right-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                                    <Calendar
                                        mode="range"
                                        locale={ko}
                                        selected={dateRange}
                                        onSelect={(range) => {
                                            setDateRange(range)
                                            if (range?.from && range?.to) {
                                                setIsCalendarOpen(false)
                                            }
                                        }}
                                        numberOfMonths={2}
                                    />
                                </div>
                            )}
                        </div>
                        <span className="flex items-center gap-1 text-body-12-r text-gray-500">
                            <Clock className="h-3 w-3" />
                            (3:00)
                        </span>
                    </div>
                </div>
            </div>

            {/* 1. 일별 결제금액 */}
            <Card className="border border-gray-300 rounded-[10px] bg-white shadow-none py-0 gap-0 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-6 bg-white border-0 gap-0 rounded-t-[10px]">
                    <div className="flex items-center gap-1 flex-1 min-w-0 min-h-px">
                        <CardTitle className="text-heading-20-sb text-gray-900 whitespace-nowrap">일별 결제금액</CardTitle>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="cursor-help shrink-0">
                                    <InfoIcon className="h-6 w-6" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                className="bg-black/70 text-white text-body-10-r px-2 py-1.5 rounded-[4px] max-w-[200px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08),0px_3px_10px_0px_rgba(0,0,0,0.1)] border-0 [&>svg]:hidden"
                                sideOffset={8}
                            >
                                <p className="whitespace-pre-wrap text-justify">
                                    결제금액을 {chartPeriods.payment === 'day' ? '일별' : chartPeriods.payment === 'week' ? '주별' : '월별'}로 조회할 수 있으며, 7일 평균 차트를 통해 결제금액의 이동 추세를 확인할 수 있어요
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, payment: 'day' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none border-r border-gray-200 bg-white ${
                                chartPeriods.payment === 'day' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">일</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, payment: 'week' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none border-r border-gray-200 bg-white ${
                                chartPeriods.payment === 'week' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">주</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, payment: 'month' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none bg-white ${
                                chartPeriods.payment === 'month' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">월</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-4 py-[30px] bg-white rounded-b-[10px]">
                    {isLoading ? (
                        <Skeleton className="h-[284px] w-full" />
                    ) : dailyPaymentData.length > 0 ? (
                        <div className="flex flex-col gap-5 items-center w-full">
                            <ChartContainer config={paymentChartConfig} className="h-[284px] w-full">
                                <ComposedChart data={dailyPaymentData} barCategoryGap="20%">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" />
                                    <XAxis
                                        dataKey="dateLabel"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#212121', fontSize: 12 }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#616161', fontSize: 12 }}
                                        tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Bar
                                        dataKey="payment"
                                        fill="#f8bdb3"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Line
                                        type="linear"
                                        dataKey="average"
                                        stroke="#de4525"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={{ r: 5, fill: '#de4525' }}
                                    />
                                </ComposedChart>
                            </ChartContainer>
                            <div className="flex gap-3 items-center justify-center shrink-0">
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#f8bdb3] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">결제 금액</span>
                                </div>
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-0.5 rounded-[2px] bg-[#de4525] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">7일간 평균 결제 금액</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <EmptyState message="조회된 일별 결제금액 내역이 없어요" />
                    )}
                </CardContent>
            </Card>

            {/* 2. 일별 결제자수 및 결제수 */}
            <Card className="border border-gray-300 rounded-[10px] bg-white shadow-none py-0 gap-0 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-6 bg-white border-0 gap-0 rounded-t-[10px]">
                    <div className="flex items-center gap-1 flex-1 min-w-0 min-h-px">
                        <CardTitle className="text-heading-20-sb text-gray-900 whitespace-nowrap">일별 결제자수 및 결제수</CardTitle>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="cursor-help shrink-0">
                                    <InfoIcon className="h-6 w-6" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                className="bg-black/70 text-white text-body-10-r px-2 py-1.5 rounded-[4px] max-w-[200px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08),0px_3px_10px_0px_rgba(0,0,0,0.1)] border-0 [&>svg]:hidden"
                                sideOffset={8}
                            >
                                <p className="whitespace-pre-wrap text-justify">
                                    결제자수와 결제수를 {chartPeriods.payer === 'day' ? '일별' : chartPeriods.payer === 'week' ? '주별' : '월별'}로 조회할 수 있어요
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, payer: 'day' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none border-r border-gray-200 bg-white ${
                                chartPeriods.payer === 'day' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">일</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, payer: 'week' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none border-r border-gray-200 bg-white ${
                                chartPeriods.payer === 'week' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">주</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, payer: 'month' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none bg-white ${
                                chartPeriods.payer === 'month' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">월</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-4 py-[30px] bg-white rounded-b-[10px]">
                    {isLoading ? (
                        <Skeleton className="h-[284px] w-full" />
                    ) : dailyPayerData.length > 0 ? (
                        <div className="flex flex-col gap-5 items-center w-full">
                            <ChartContainer config={payerChartConfig} className="h-[284px] w-full">
                                <ComposedChart data={dailyPayerData} barCategoryGap="20%" barGap={0}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" />
                                    <XAxis
                                        dataKey="dateLabel"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#212121', fontSize: 12 }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#616161', fontSize: 12 }}
                                        tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Bar
                                        dataKey="payers"
                                        fill="#f8bdb3"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="payments"
                                        fill="#fcded9"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </ComposedChart>
                            </ChartContainer>
                            <div className="flex gap-3 items-center justify-center shrink-0">
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#f8bdb3] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">결제자 수</span>
                                </div>
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#fcded9] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">결제수</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <EmptyState message="조회된 일별 결제자수 및 결제수 내역이 없어요" />
                    )}
                </CardContent>
            </Card>

            {/* 3. 요일별 결제금액 및 평균 결제금액 */}
            <Card className="border border-gray-300 rounded-[10px] bg-white shadow-none py-0 gap-0 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-6 bg-white border-0 gap-0 rounded-t-[10px]">
                    <div className="flex items-center gap-1 flex-1 min-w-0 min-h-px">
                        <CardTitle className="text-heading-20-sb text-gray-900 whitespace-nowrap">요일별 결제금액 및 평균 결제금액</CardTitle>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="cursor-help shrink-0">
                                    <InfoIcon className="h-6 w-6" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                className="bg-black/70 text-white text-body-10-r px-2 py-1.5 rounded-[4px] max-w-[200px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08),0px_3px_10px_0px_rgba(0,0,0,0.1)] border-0 [&>svg]:hidden"
                                sideOffset={8}
                            >
                                <p className="whitespace-pre-wrap text-justify">
                                    요일별 결제금액을 주차별로 비교하고, 요일별 평균 결제금액 추세를 확인할 수 있어요
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, weekday: 'day' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none border-r border-gray-200 bg-white ${
                                chartPeriods.weekday === 'day' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">일</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, weekday: 'week' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none border-r border-gray-200 bg-white ${
                                chartPeriods.weekday === 'week' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">주</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, weekday: 'month' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none bg-white ${
                                chartPeriods.weekday === 'month' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">월</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-4 py-[30px] bg-white rounded-b-[10px]">
                    {isLoading ? (
                        <Skeleton className="h-[284px] w-full" />
                    ) : weekdayData.length > 0 ? (
                        <div className="flex flex-col gap-5 items-center w-full">
                            <ChartContainer config={weekdayChartConfig} className="h-[284px] w-full">
                                <ComposedChart 
                                    data={weekdayData} 
                                    barCategoryGap="5%" 
                                    barGap={0}
                                    margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" />
                                    <XAxis
                                        dataKey="weekday"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#212121', fontSize: 12 }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#616161', fontSize: 12 }}
                                        tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Bar
                                        dataKey="week1"
                                        fill="#f8bdb3"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                    <Bar
                                        dataKey="week2"
                                        fill="#fef4f2"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                    <Bar
                                        dataKey="week3"
                                        fill="#fcded9"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                    <Bar
                                        dataKey="week4"
                                        fill="#f49b8e"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                    <Line
                                        type="linear"
                                        dataKey="average"
                                        stroke="#de4525"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={{ r: 5, fill: '#de4525' }}
                                    />
                                </ComposedChart>
                            </ChartContainer>
                            <div className="flex gap-3 items-center justify-center shrink-0 flex-wrap">
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#f8bdb3] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">25년 3월 1주차</span>
                                </div>
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#fef4f2] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">25년 3월 2주차</span>
                                </div>
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#fcded9] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">25년 3월 3주차</span>
                                </div>
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#f49b8e] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">25년 3월 4주차</span>
                                </div>
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-0.5 rounded-[2px] bg-[#de4525] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">요일별 평균 결제금액</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <EmptyState message="조회된 요일별 결제금액 및 평균 결제금액 내역이 없어요" />
                    )}
                </CardContent>
            </Card>

            {/* 4. 일별 환불율 */}
            <Card className="border border-gray-300 rounded-[10px] bg-white shadow-none py-0 gap-0 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-6 bg-white border-0 gap-0 rounded-t-[10px]">
                    <div className="flex items-center gap-1 flex-1 min-w-0 min-h-px">
                        <CardTitle className="text-heading-20-sb text-gray-900 whitespace-nowrap">일별 환불율</CardTitle>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="cursor-help shrink-0">
                                    <InfoIcon className="h-6 w-6" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                className="bg-black/70 text-white text-body-10-r px-2 py-1.5 rounded-[4px] max-w-[200px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08),0px_3px_10px_0px_rgba(0,0,0,0.1)] border-0 [&>svg]:hidden"
                                sideOffset={8}
                            >
                                <p className="whitespace-pre-wrap text-justify">
                                    환불율을 {chartPeriods.refund === 'day' ? '일별' : chartPeriods.refund === 'week' ? '주별' : '월별'}로 조회할 수 있으며, 결제금액 대비 환불금액의 비율을 확인할 수 있어요
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, refund: 'day' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none border-r border-gray-200 bg-white ${
                                chartPeriods.refund === 'day' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">일</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, refund: 'week' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none border-r border-gray-200 bg-white ${
                                chartPeriods.refund === 'week' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">주</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setChartPeriods({ ...chartPeriods, refund: 'month' })}
                            className={`h-8 px-2.5 py-1.5 rounded-none bg-white ${
                                chartPeriods.refund === 'month' 
                                    ? 'text-gray-800' 
                                    : 'text-gray-300'
                            }`}
                        >
                            <span className="text-body-12-m whitespace-nowrap">월</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-4 py-[30px] bg-white rounded-b-[10px]">
                    {isLoading ? (
                        <Skeleton className="h-[284px] w-full" />
                    ) : refundData.length > 0 ? (
                        <div className="flex flex-col gap-5 items-center w-full">
                            <ChartContainer config={refundChartConfig} className="h-[284px] w-full">
                                <ComposedChart data={refundData} barCategoryGap="20%" barGap={0}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" />
                                    <XAxis
                                        dataKey="dateLabel"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#212121', fontSize: 12 }}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#616161', fontSize: 12 }}
                                        tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: '#616161', fontSize: 12 }}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Bar
                                        yAxisId="left"
                                        dataKey="payment"
                                        fill="#f8bdb3"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        yAxisId="left"
                                        dataKey="refund"
                                        fill="#fcded9"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="linear"
                                        dataKey="rate"
                                        stroke="#de4525"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        dot={{ r: 5, fill: '#de4525' }}
                                    />
                                </ComposedChart>
                            </ChartContainer>
                            <div className="flex gap-3 items-center justify-center shrink-0">
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#f8bdb3] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">결제금액</span>
                                </div>
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#fcded9] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">환불금액</span>
                                </div>
                                <div className="flex gap-2 items-center shrink-0">
                                    <div className="w-2.5 h-0.5 rounded-[2px] bg-[#de4525] shrink-0" />
                                    <span className="text-body-10-r text-gray-800 whitespace-nowrap">환불비율</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <EmptyState message="조회된 일별 환불율 내역이 없어요" />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default SalesAnalysis
