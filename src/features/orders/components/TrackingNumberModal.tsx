import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { BgrDialog } from 'src/shared/components/dialog/BgrDialog'
import type { TrackingNumberModalProps } from '../type/orderModalType'
import { UI_TEXT } from '../constants/orderConstants'

const CARRIER_LIST = [
    'CJ대한통운',
    '롯데택배',
    '한진택배',
    '로젠택배',
    '우체국택배',
    'CJ대한통운(국제택배)',
    'CU편의점택배',
    'GOP당일택배',
    'GOS당일택배',
    'GPSLOGIX',
    'GSFresh',
    'GSI익스프레스',
    'GSMNTON',
    'GSPostbox퀵',
    'GSPostbox택배',
    '기타',
]

const TrackingNumberModal = ({
    type,
    courierCompany,
    trackingNumber,
    onConfirm,
    onCancel,
}: TrackingNumberModalProps) => {
    const [inputValues, setInputValues] = useState({
        courierCompany,
        trackingNumber,
    })

    return (
        <BgrDialog
            open
            type="popup"
            title={type === 'register' ? '운송장 입력' : '운송장 수정'}
            onOpenChange={onCancel}
        >
            <div className="flex flex-col gap-6">
                <div className="flex gap-2">
                    <div className="flex w-[186px] flex-col items-stretch gap-1.5">
                        <p className="text-12 text-gray-800">택배사</p>
                        <SelectPrimitive.Root
                            value={inputValues.courierCompany}
                            onValueChange={(changedCarrier) => {
                                setInputValues((prev) => ({
                                    ...prev,
                                    courierCompany: changedCarrier,
                                }))
                            }}
                        >
                            <SelectPrimitive.Trigger className="flex w-[186px] items-center justify-between gap-2 rounded-lg border border-gray-300 py-2 pr-2 pl-3">
                                <SelectPrimitive.Value />
                                <SelectPrimitive.Icon>
                                    <ChevronDown size={20} />
                                </SelectPrimitive.Icon>
                            </SelectPrimitive.Trigger>
                            <SelectPrimitive.Content
                                position="popper"
                                className="top-full z-50 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                            >
                                <SelectPrimitive.Viewport className="p-1">
                                    {CARRIER_LIST.map((carrierName) => (
                                        <SelectPrimitive.Item
                                            value={carrierName}
                                            className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                        >
                                            <SelectPrimitive.ItemText>
                                                {carrierName}
                                            </SelectPrimitive.ItemText>
                                        </SelectPrimitive.Item>
                                    ))}
                                </SelectPrimitive.Viewport>
                            </SelectPrimitive.Content>
                        </SelectPrimitive.Root>
                    </div>
                    <div className="flex grow flex-col items-stretch gap-1.5">
                        <p className="text-12 text-gray-800">운송장 번호</p>
                        <input
                            type="text"
                            placeholder={UI_TEXT.PLACEHOLDER.TRACKING_NUMBER}
                            value={inputValues.trackingNumber}
                            onChange={(event) => {
                                setInputValues((prev) => ({
                                    ...prev,
                                    trackingNumber: event.target.value,
                                }))
                            }}
                            className="rounded-lg border border-gray-300 px-3 py-2"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="h-[42px] w-[90px] rounded-lg border border-gray-200 bg-white text-gray-800"
                    >
                        취소
                    </button>
                    {/* TODO :: 운송장 등록 API 호출 */}
                    <button
                        disabled={
                            !inputValues.courierCompany ||
                            !inputValues.trackingNumber
                        }
                        onClick={onConfirm}
                        className="h-[42px] w-[90px] rounded-lg bg-gray-900 text-white disabled:bg-gray-300"
                    >
                        확인
                    </button>
                </div>
            </div>
        </BgrDialog>
    )
}

export default TrackingNumberModal
