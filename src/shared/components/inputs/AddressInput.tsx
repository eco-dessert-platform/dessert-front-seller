import RequiredLabel from 'src/shared/components/text/RequiredLabel.tsx'
import { Button } from 'src/shared/lib/shadcn/components/ui/button.tsx'
import { Input } from 'src/shared/lib/shadcn/components/ui/input.tsx'

interface AddressInputProps {
    postalCode?: string
    address?: string
    detailAddress?: string
    onPostalCodeSearch?: () => void
    onDetailAddressChange?: (value: string) => void
    disabled?: boolean
}

const AddressInput = ({
    postalCode,
    address,
    detailAddress,
    onPostalCodeSearch,
    onDetailAddressChange,
    disabled = false,
}: AddressInputProps) => {
    return (
        <>
            <div className="flex items-start gap-4 self-stretch px-5 py-2.5">
                {/* 우편번호 + 주소 */}
                <div className="flex w-[310px] flex-col items-start gap-1">
                    <RequiredLabel>우편번호</RequiredLabel>
                    <div className="flex items-start gap-4 self-stretch">
                        <Input
                            className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 placeholder:text-gray-400"
                            placeholder="우편번호"
                            value={postalCode}
                            readOnly
                            disabled={disabled}
                        />
                        <Button
                            className="bg-primary-500 flex min-w-[90px] items-center justify-center rounded-[10px] px-4 py-2"
                            onClick={onPostalCodeSearch}
                            disabled={disabled}
                        >
                            <p className="text-title-16-m text-white">
                                우편번호 검색
                            </p>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-1/2 flex-col items-start gap-1">
                    <RequiredLabel>출고지 주소</RequiredLabel>
                    <div className="flex items-start gap-4 self-stretch">
                        <Input
                            className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 placeholder:text-gray-400"
                            placeholder="출고지 주소"
                            value={address}
                            readOnly
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>

            {/* 상세 주소 */}
            <div className="flex flex-col items-start gap-4 self-stretch px-5 py-2.5">
                <div className="flex flex-col items-start gap-1 self-stretch">
                    <RequiredLabel>출고지 상세 주소</RequiredLabel>
                    <Input
                        className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 placeholder:text-gray-400"
                        placeholder="상세주소를 입력해주세요(동/호수 포함)"
                        value={detailAddress}
                        onChange={(e) =>
                            onDetailAddressChange?.(e.target.value)
                        }
                        disabled={disabled}
                    />
                </div>
            </div>
        </>
    )
}

export default AddressInput
