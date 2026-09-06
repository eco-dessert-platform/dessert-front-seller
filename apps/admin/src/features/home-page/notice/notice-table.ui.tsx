import { useCallback, useEffect, useMemo, useState } from 'react'

import { Table, toast } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import { Notice, noticeMockData } from '@/entity/home-page/notice'
import { CLIENT_NOTICE_URL, ROUTES } from '@/shared/constant'

import { NoticeActionGroup } from './notice-action-group.ui'
import { getNoticeColumns } from './notice-columns.util'
import { NoticeDeleteConfirmDialog } from './notice-delete-confirm-dialog.ui'

export const NoticeTable = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // TODO(#286 후속): 목록 조회 API 연동 시 실데이터로 교체
  const tableData: Notice[] = noticeMockData
  const totalPages = 1
  const allSelected =
    tableData.length > 0 && selectedIds.length === tableData.length

  useEffect(() => {
    setSelectedIds([])
    setIsDeleteDialogOpen(false)
  }, [currentPage])

  const handleToggleAll = useCallback(
    (checked: boolean | 'indeterminate') => {
      setSelectedIds(checked === true ? tableData.map((row) => row.id) : [])
    },
    [tableData],
  )

  const handleToggleRow = useCallback(
    (id: number, checked: boolean | 'indeterminate') => {
      setSelectedIds((prev) =>
        checked === true
          ? prev.includes(id)
            ? prev
            : [...prev, id]
          : prev.filter((selectedId) => selectedId !== id),
      )
    },
    [],
  )

  const handleCreate = () => {
    navigate(ROUTES.HOMEPAGE.NOTICE_CREATE)
  }

  const handleEdit = useCallback(
    (id: number) => {
      navigate(ROUTES.HOMEPAGE.noticeEdit(id))
    },
    [navigate],
  )

  /** 공지사항명 클릭 시 클라이언트 공지사항 화면을 새 탭으로 연다 */
  const handleSelectNotice = useCallback((id: number) => {
    window.open(CLIENT_NOTICE_URL(id), '_blank', 'noopener,noreferrer')
  }, [])

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      toast.info('선택된 공지사항이 없습니다.')
      return
    }

    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    // TODO(#286 후속): 다중 삭제 API 연동
    setSelectedIds([])
    setIsDeleteDialogOpen(false)
  }

  const columns = useMemo(
    () =>
      getNoticeColumns({
        allSelected,
        selectedIds,
        onToggleAll: handleToggleAll,
        onToggleRow: handleToggleRow,
        onEdit: handleEdit,
        onSelectNotice: handleSelectNotice,
      }),
    [
      allSelected,
      handleEdit,
      handleSelectNotice,
      handleToggleAll,
      handleToggleRow,
      selectedIds,
    ],
  )

  return (
    <>
      <Table
        data={tableData}
        columns={columns}
        topArea={
          <NoticeActionGroup
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onCreate={handleCreate}
            onDelete={handleDelete}
            isDeleteDisabled={selectedIds.length === 0}
          />
        }
      />
      <NoticeDeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
