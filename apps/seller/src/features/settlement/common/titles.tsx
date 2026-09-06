import { Text } from '@dessert/ui'

interface ISettlementTitlesProps {
  title: string
  descriptions?: string[]
}

const SettlementTitles = ({ title, descriptions }: ISettlementTitlesProps) => {
  const hasDescriptions = Boolean(descriptions?.length)

  return (
    <div className="flex flex-col">
      <Text
        as="h2"
        variant="heading20-sb"
        className={hasDescriptions ? 'mb-8' : 'mb-10'}
      >
        {title}
      </Text>
      {hasDescriptions && (
        <div className="flex flex-col gap-2">
          {descriptions?.map((description) => (
            <Text key={description} variant="body12-r" color="gray-700">
              {description}
            </Text>
          ))}
        </div>
      )}
    </div>
  )
}

export default SettlementTitles
