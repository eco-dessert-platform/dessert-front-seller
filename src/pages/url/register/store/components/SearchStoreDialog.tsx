import { ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import BgrInputField from 'src/shared/components/inputField/BgrInputField'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from 'src/shared/lib/shadcn/components/ui/alert-dialog'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/shared/lib/shadcn/components/ui/dialog'
import { cn } from 'src/shared/lib/shadcn/lib/utils'
import { DATA_LIST } from './mock'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks'
import { RootState } from 'src/global/store/redux/reduxStore'
import { storeAction } from '../storeReducer'

function SearchStoreDialog({
    open,
    onOpenChange,
    handleSearch,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    handleSearch: () => void
}) {
    const dispatch = useAppDispatch()
    const searchKeyword = useAppSelector(
        (state: RootState) => state.storeReducer.searchKeyword,
    )
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>내 스토어 검색</DialogTitle>
                <DialogDescription>
                    빵그리의 오븐에 자동 등록돼 있는 스토어라면 검색 후
                    확인해주세요.
                </DialogDescription>
                <div className="flex items-end gap-2">
                    <BgrInputField
                        value={searchKeyword}
                        onChange={(e) =>
                            dispatch(
                                storeAction.setSearchKeyword(e.target.value),
                            )
                        }
                        placeholder="스토어명을 검색해주세요"
                        buttonText="중복검사"
                        onButtonClick={handleSearch}
                    />
                </div>
                <SearchStoreResult searchKeyword={searchKeyword} />
            </DialogContent>
        </Dialog>
    )
}

function SearchStoreResult({ searchKeyword }: { searchKeyword: string }) {
    const [isAddDialogOpen, setAddDialogOpen] = useState(false)
    const dispatch = useAppDispatch()
    const highlightKeyword = (text: string, keyword: string) => {
        if (!keyword.trim()) {
            return <>{text}</>
        }

        const regex = new RegExp(`(${keyword})`, 'gi')
        const parts = text.split(regex)

        return (
            <>
                {parts.map((part, index) => {
                    if (part.toLowerCase() === keyword.toLowerCase()) {
                        return (
                            <span key={index} className="text-primary-500">
                                {part}
                            </span>
                        )
                    }
                    return <span key={index}>{part}</span>
                })}
            </>
        )
    }

    if (DATA_LIST.length === 0) {
        return (
            <div className="flex h-[288px] flex-col gap-2 rounded-lg border border-gray-300 p-4">
                <p className="text-body-16-r text-gray-400">
                    검색된 결과가 없어요
                </p>
            </div>
        )
    }
    return (
        <>
            <div className="relative flex h-[288px] flex-col gap-2 overflow-hidden rounded-lg border border-gray-300">
                <div className="flex w-full flex-col items-start gap-2 overflow-y-auto p-4">
                    {DATA_LIST.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                'w-full rounded-lg p-2 text-left',
                                item.id === 1 ? 'bg-primary-50' : '',
                            )}
                            onClick={() =>
                                dispatch(
                                    storeAction.setSearchKeyword(item.name),
                                )
                            }
                        >
                            <p className="text-title-16-r text-gray-900">
                                {highlightKeyword(item.name, searchKeyword)}
                            </p>
                        </button>
                    ))}
                </div>

                <div className="sticky right-0 bottom-0 left-0 bg-gray-100 px-6 py-2">
                    <button
                        className="flex items-center gap-2"
                        onClick={() => setAddDialogOpen(true)}
                    >
                        <p className="text-title-16-r text-gray-900">
                            스토어 신규 등록
                        </p>
                        <ChevronRightIcon strokeWidth={1} className="size-4" />
                    </button>
                </div>
            </div>
            <NewStoreRegistrationAlertDialog
                open={isAddDialogOpen}
                onOpenChange={setAddDialogOpen}
            />
        </>
    )
}

function NewStoreRegistrationAlertDialog({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        “빵그리의 오븐" 으로 스토어명을 등록할까요?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        정확한 등록을 위해 한 번만 확인 부탁드려요
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction>확인</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SearchStoreDialog
