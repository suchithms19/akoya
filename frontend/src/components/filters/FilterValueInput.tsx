import { useState } from 'react'
import { FilterOption } from '@/types/filters'

interface FilterValueInputProps {
  filter: FilterOption
  onValueChange: (value: any) => void
}

type Operator = 'equals' | 'contains' | 'greater' | 'less' | 'between' | 'in'

interface FilterValue {
  operator: Operator
  value: any
  secondValue?: any // For between operator
}

/**
 * Input component for filter values based on field type
 */
export function FilterValueInput({ filter, onValueChange }: FilterValueInputProps) {
  const [filterValue, setFilterValue] = useState<FilterValue>({
    operator: 'equals',
    value: ''
  })

  // Determine available operators based on field type
  const getOperators = (field: string): Operator[] => {
    switch (field) {
      case 'creative_id':
      case 'creative_name':
      case 'country':
      case 'ad_network':
      case 'os':
      case 'campaign':
      case 'ad_group':
        return ['equals', 'contains']
      
      case 'tags':
        return ['contains']
      
      case 'ipm':
      case 'ctr':
      case 'spend':
      case 'impressions':
      case 'clicks':
      case 'cpm':
      case 'cost_per_click':
      case 'cost_per_install':
      case 'installs':
        return ['equals', 'greater', 'less', 'between']
      
      default:
        return ['equals']
    }
  }

  const operators = getOperators(filter.field)

  const handleOperatorChange = (operator: Operator) => {
    setFilterValue(prev => ({
      ...prev,
      operator,
      value: '',
      secondValue: undefined
    }))
  }

  const handleValueChange = (value: string, isSecond = false) => {
    if (isSecond) {
      setFilterValue(prev => ({
        ...prev,
        secondValue: value
      }))
    } else {
      setFilterValue(prev => ({
        ...prev,
        value
      }))
    }
  }

  const renderInput = () => {
    const isNumeric = [
      'ipm', 'ctr', 'spend', 'impressions', 'clicks', 
      'cpm', 'cost_per_click', 'cost_per_install', 'installs'
    ].includes(filter.field)

    switch (filterValue.operator) {
      case 'between':
        return (
          <div className="flex items-center gap-2">
            <input
              type={isNumeric ? 'number' : 'text'}
              placeholder="Min"
              value={filterValue.value}
              onChange={(e) => handleValueChange(e.target.value)}
              className="flex-1 px-3 py-1 border rounded-md text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type={isNumeric ? 'number' : 'text'}
              placeholder="Max"
              value={filterValue.secondValue || ''}
              onChange={(e) => handleValueChange(e.target.value, true)}
              className="flex-1 px-3 py-1 border rounded-md text-sm"
            />
          </div>
        )

      case 'contains':
        return (
          <input
            type="text"
            placeholder="Enter value..."
            value={filterValue.value}
            onChange={(e) => handleValueChange(e.target.value)}
            className="w-full px-3 py-1 border rounded-md text-sm"
          />
        )

      default:
        return (
          <input
            type={isNumeric ? 'number' : 'text'}
            placeholder="Enter value..."
            value={filterValue.value}
            onChange={(e) => handleValueChange(e.target.value)}
            className="w-full px-3 py-1 border rounded-md text-sm"
          />
        )
    }
  }

  const handleApplyFilter = () => {
    // Validate the filter value before applying
    if (!filterValue.value) return

    if (filterValue.operator === 'between' && !filterValue.secondValue) return

    onValueChange(filterValue)
  }

  return (
    <div className="space-y-3">
      {/* Operator Selection */}
      <div className="flex gap-2">
        {operators.map((op) => (
          <button
            key={op}
            onClick={() => handleOperatorChange(op)}
            className={`px-3 py-1 text-sm rounded-md ${
              filterValue.operator === op
                ? 'bg-lightgreen text-darkgreen font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </button>
        ))}
      </div>

      {/* Value Input */}
      {renderInput()}

      {/* Apply Button */}
      <button
        onClick={handleApplyFilter}
        disabled={!filterValue.value || (filterValue.operator === 'between' && !filterValue.secondValue)}
        className={`w-full px-4 py-2 rounded-md text-sm font-medium mt-3
          ${(!filterValue.value || (filterValue.operator === 'between' && !filterValue.secondValue))
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-lightgreen text-darkgreen hover:bg-green-200'
          }`}
      >
        Apply Filter
      </button>
    </div>
  )
} 