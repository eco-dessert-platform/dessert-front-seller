import characterLogo from '@/assets/images/character-logo.png'
import { Text } from '@dessert/ui'

interface TableEmptyProps {
  description: string
}

const TableEmpty = ({ description }: TableEmptyProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <img src={characterLogo} alt="" className="size-28" />
        <Text as="p" variant="body14-r" color="gray-500">
          {description}
        </Text>
      </div>
    </div>
  )
}

export default TableEmpty
