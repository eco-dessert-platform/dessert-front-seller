import clsx from 'clsx'

export interface BgrDaySelectorProps {
    selectedDays?: string[]
    onDayChange?: (days: string[]) => void
    className?: string
}

const DAYS = [
    { value: 'mon', label: '월' },
    { value: 'tue', label: '화' },
    { value: 'wed', label: '수' },
    { value: 'thu', label: '목' },
    { value: 'fri', label: '금' },
    { value: 'sat', label: '토' },
    { value: 'sun', label: '일' },
]

const BgrDaySelector = ({
    selectedDays = [],
    onDayChange,
    className = '',
}: BgrDaySelectorProps) => {
    const handleDayClick = (dayValue: string) => {
        const newSelectedDays = selectedDays.includes(dayValue)
            ? selectedDays.filter((d) => d !== dayValue)
            : [...selectedDays, dayValue]

        onDayChange?.(newSelectedDays)
    }

    return (
        <div className={clsx('flex gap-2', className)} role="group">
            {DAYS.map((day) => {
                const isSelected = selectedDays.includes(day.value)

                return (
                    <button
                        key={day.value}
                        type="button"
                        onClick={() => handleDayClick(day.value)}
                        className={clsx(
                            'flex items-center justify-center w-[42px] h-[42px] p-1.5 rounded-full',
                            'text-title-16-m transition-colors',
                            isSelected
                                ? 'bg-primary-50 text-primary-500'
                                : 'bg-white text-gray-800 hover:bg-gray-50',
                        )}
                        aria-pressed={isSelected}
                    >
                        {day.label}
                    </button>
                )
            })}
        </div>
    )
}

export default BgrDaySelector

