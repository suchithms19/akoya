import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Props for the TableHeader component
 */
interface TableHeaderProps {
  columnOrder: string[]
  sortConfig: {
    key: string
    direction: 'asc' | 'desc'
  } | null
  onSort: (key: string) => void
}

/**
 * Header component for the data table with sorting functionality
 */
export function TableHeader({ columnOrder, sortConfig, onSort }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {/* Serial Number Column with tooltip */}
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b w-16 group relative">
          <div className="flex items-center gap-1">
            S.No
            <span className="hidden group-hover:block absolute top-full left-0 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
              Click to view details
            </span>
          </div>
        </th>
        
        {/* Sortable Columns */}
        {columnOrder.map((column) => (
          <th 
            key={column}
            onClick={() => onSort(column)}
            className={cn(
              "px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b",
              column !== 'tags' && "cursor-pointer hover:bg-gray-100"
            )}
          >
            <div className="flex items-center gap-2">
              <span>
                {column.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
              {column !== 'tags' && (
                sortConfig?.key === column ? (
                  sortConfig.direction === 'asc' 
                    ? <ChevronUp className="h-4 w-4 text-darkgreen" />
                    : <ChevronDown className="h-4 w-4 text-darkgreen" />
                ) : (
                  <ArrowUpDown className="h-4 w-4 text-gray-400 opacity-50" />
                )
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
} 