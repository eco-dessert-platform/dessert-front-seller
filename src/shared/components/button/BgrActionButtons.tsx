import BgrButton from './BgrButton'

interface BgrActionButtonsProps {
    onBack?: () => void
    onNext?: () => void
    backLabel?: string
    nextLabel?: string
    nextDisabled?: boolean
    showBack?: boolean
    showNext?: boolean
}

const BgrActionButtons = ({
    onBack,
    onNext,
    backLabel = '뒤로가기',
    nextLabel = '다음',
    nextDisabled = false,
    showBack = true,
    showNext = true,
}: BgrActionButtonsProps) => {
    return (
        <footer className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-2.5 self-stretch bg-white">
            <div className="flex items-end justify-end gap-3 self-stretch p-6">
                {showBack && onBack && (
                    <BgrButton
                        title={backLabel}
                        onClick={onBack}
                        variant="secondary"
                        size="lg"
                    />
                )}
                {showNext && onNext && (
                    <BgrButton
                        title={nextLabel}
                        onClick={onNext}
                        variant={
                            nextDisabled
                                ? 'secondary-outlined'
                                : 'primary-filled'
                        }
                        size="lg"
                        disabled={nextDisabled}
                    />
                )}
            </div>
        </footer>
    )
}

export default BgrActionButtons
