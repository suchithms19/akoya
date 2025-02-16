import { X } from 'lucide-react'
import { FilterOption } from '@/types/filters'

interface AppliedFilter {
  filter: FilterOption
  value: {
    operator: string
    value: any
    secondValue?: any
  }
}

interface AppliedFiltersProps {
  filters: AppliedFilter[]
  onRemove: (filterId: string) => void
}

/**
 * Component to display and manage applied filters
 */
export function AppliedFilters({ filters, onRemove }: AppliedFiltersProps) {
  const getFilterDisplay = (filter: AppliedFilter) => {
    const { operator, value, secondValue } = filter.value

    switch (operator) {
      case 'between':
        return `${filter.filter.label}: ${value} to ${secondValue}`
      case 'contains':
        return `${filter.filter.label} contains: ${value}`
      case 'greater':
        return `${filter.filter.label} > ${value}`
      case 'less':
        return `${filter.filter.label} < ${value}`
      default:
        return `${filter.filter.label}: ${value}`
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {filters.map((filter) => (
        <div
          key={filter.filter.id}
          className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
        >
          <span>{getFilterDisplay(filter)}</span>
          <button
            onClick={() => onRemove(filter.filter.id)}
            className="p-0.5 hover:bg-gray-200 rounded-full"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  )
} 