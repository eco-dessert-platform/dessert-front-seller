import { useState, useCallback } from 'react'
import AdminProductTable from './components/AdminProductTable'
import AdminProductControl from './components/AdminProductControl'

const AdminProducts = () => {
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([])

    const handleSelectionChange = (data: {
        selectedProductIds: string[]
        selectedOptionIds: string[]
    }) => {
        setSelectedProductIds(data.selectedProductIds)
        setSelectedOptionIds(data.selectedOptionIds)
    }

    const handleSelectionReset = useCallback(() => {
        setSelectedProductIds([])
        setSelectedOptionIds([])
    }, [])

    return (
        <div className="w-full rounded-lg border border-gray-300 bg-white">
            <div className="flex flex-col gap-4 p-4">
                <AdminProductControl
                    selectedProductIds={selectedProductIds}
                    selectedOptionIds={selectedOptionIds}
                    onSelectionReset={handleSelectionReset}
                />
                <AdminProductTable
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    )
}

export default AdminProducts
