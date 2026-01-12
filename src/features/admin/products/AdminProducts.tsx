import AdminProductTable from './components/AdminProductTable'
import AdminProductControl from './components/AdminProductControl'

const AdminProducts = () => {
    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white">
            <div className="flex flex-col gap-4 p-4">
                <AdminProductControl />
                <AdminProductTable />
            </div>
        </div>
    )
}

export default AdminProducts
