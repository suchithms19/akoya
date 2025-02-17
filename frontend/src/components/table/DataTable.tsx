import { useState, useMemo } from 'react'
import { TagsDialog } from './TagsDialog'
import { TableHeader } from './TableHeader'
import { RowPreview } from './RowPreview'
import { FullDetailsDialog } from './FullDetailsDialog'

interface DataTableProps {
  data: any[]
  searchQuery: string
  onSearchChange: (value: string) => void
}

type SortConfig = {
  key: string
  direction: 'asc' | 'desc'
} | null

export function DataTable({ data, searchQuery }: DataTableProps) {
  const [selectedTags, setSelectedTags] = useState<Record<string, any> | null>(null)
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null)
  const [showFullDetails, setShowFullDetails] = useState(false)

  const columnOrder = [
    'creative_id',
    'creative_name',
    'tags',
    'country',
    'ad_network',
    'os',
    'campaign',
    'ad_group',
    'ipm',
    'ctr',
    'spend',
    'impressions',
    'clicks',
    'cpm',
    'cost_per_click',
    'cost_per_install',
    'installs'
  ]

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' }
        }
        return null
      }
      return { key, direction: 'asc' }
    })
  }

  const processedData = useMemo(() => {
    let filtered = data
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase()
      filtered = data.filter(row => {
        // Search through all columns except tags
        const basicMatch = columnOrder
          .filter(col => col !== 'tags')
          .some(col => {
            const value = row[col]
            if (value === null || value === undefined) return false
            return value.toString().toLowerCase().includes(query)
          })

        // Special handling for tags
        const tagsMatch = row.tags ? (() => {
          const tagsString = JSON.stringify(row.tags)
            .toLowerCase()
            .replace(/[{}"[\]]/g, '')
            .replace(/,/g, ' ')

          return tagsString.includes(query)
        })() : false

        return basicMatch || tagsMatch
      })
    }

    // Apply sorting
    if (sortConfig) {
      const { key, direction } = sortConfig
      filtered = [...filtered].sort((a, b) => {
        let aValue = a[key]
        let bValue = b[key]

        // Handle numeric values
        if (typeof aValue === 'string' && !isNaN(Number(aValue))) {
          aValue = Number(aValue)
          bValue = Number(bValue)
        }

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) return 1
        if (bValue === null || bValue === undefined) return -1
        if (aValue === bValue) return 0

        // Handle string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        // Handle numeric comparison
        const comparison = aValue < bValue ? -1 : 1
        return direction === 'asc' ? comparison : -comparison
      })
    }

    return filtered
  }, [data, searchQuery, sortConfig])

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-max">
          <TableHeader 
            columnOrder={columnOrder}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          
          <tbody className="divide-y divide-gray-200">
            {processedData.map((row, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-50"
              >
                <td 
                  className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap cursor-pointer hover:text-blue-600"
                  onClick={() => setSelectedRow(row)}
                  title="Click to view details"
                >
                  {index + 1}
                </td>

                {columnOrder.map((column) => (
                  <td 
                    key={column}
                    className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                  >
                    {column === 'tags' ? (
                      row.tags ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedTags(row.tags)
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          View Tags
                        </button>
                      ) : (
                        <span className="text-gray-400">No tags</span>
                      )
                    ) : (
                      (row as any)[column]?.toString() || '-'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {processedData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No matching records found
          </div>
        )}
      </div>

      {selectedRow && (
        <RowPreview 
          data={selectedRow}
          onClose={() => setSelectedRow(null)}
          onViewFullDetails={() => setShowFullDetails(true)}
        />
      )}

      {showFullDetails && selectedRow && (
        <FullDetailsDialog
          data={selectedRow}
          isOpen={showFullDetails}
          onClose={() => setShowFullDetails(false)}
        />
      )}

      {selectedTags && (
        <TagsDialog
          tags={selectedTags}
          isOpen={!!selectedTags}
          onClose={() => setSelectedTags(null)}
        />
      )}
    </div>
  )
} 