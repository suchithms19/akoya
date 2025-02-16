import { useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'

interface TagsDialogProps {
  tags: Record<string, any>
  isOpen: boolean
  onClose: () => void
}


interface DataTableProps {
  data: any[]
}

/**
 * Dialog component to display detailed tag information in a user-friendly format
 */
function TagsDialog({ tags, isOpen, onClose }: TagsDialogProps) {
  /**
   * Checks if the tags structure is of the test creative type
   */
  const isTestCreative = (tags: any) => {
    return Array.isArray(tags.Concepts) || Array.isArray(tags.Audio)
  }

  /**
   * Renders test creative specific tag structure
   */
  const renderTestCreativeTags = (tags: any) => {
    return (
      <div className="space-y-6">
        {/* Concepts Section */}
        {tags.Concepts && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {tags.Concepts.map((concept: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Audio Section */}
        {tags.Audio && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">Audio</h3>
            <div className="space-y-3">
              {tags.Audio.map((audio: any, index: number) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Type:</span>
                      <span className="text-gray-900">{audio.Type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Language:</span>
                      <span className="text-gray-900">{audio.Language}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* End Card Elements Section */}
        {tags.EndCardElements && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">End Card Elements</h3>
            <div className="space-y-4">
              {tags.EndCardElements.map((element: any, index: number) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md">
                  {Object.entries(element).map(([key, value]) => (
                    <div key={key} className="mb-2">
                      {Array.isArray(value) ? (
                        <div>
                          <span className="text-sm text-gray-600">{key}:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {(value as string[]).map((item, i) => (
                              <span key={i} className="px-2 py-1 bg-white rounded-md text-sm text-gray-700 border">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">{key}:</span>
                          <span className="text-gray-900">{value as string}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  /**
   * Renders regular tag structure
   */
  const renderRegularTags = (data: any, title: string) => {
    if (!data) return null

    if (Array.isArray(data)) {
      return (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {data.map((item, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      )
    }

    if (typeof data === 'object') {
      return (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">{title}</h3>
          <div className="space-y-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                {renderRegularTags(value, key.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' '))}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">{title}:</span>
        <span className="text-gray-900">{data}</span>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Creative Tags</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">✕</button>
          </div>

          {isTestCreative(tags) ? (
            renderTestCreativeTags(tags)
          ) : (
            <div className="space-y-6">
              {Object.entries(tags).map(([key, value]) => (
                <div key={key}>
                  {renderRegularTags(value, key.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' '))}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-4 border-t">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

/**
 * DataTable component to display report data
 */
export function DataTable({ data }: DataTableProps) {
  const [selectedTags, setSelectedTags] = useState<Record<string, any> | null>(null)

  // Define column order to match JSON structure
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-max">
        <thead className="bg-gray-50">
          <tr>
            {/* Serial Number Column */}
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b w-16">
              S.No
            </th>
            
            {/* Other Columns */}
            {columnOrder.map((column) => (
              <th 
                key={column}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b"
              >
                {column.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr 
              key={index}
              className="hover:bg-gray-50"
            >
              {/* Serial Number Cell */}
              <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                {index + 1}
              </td>

              {/* Data Cells */}
              {columnOrder.map((column) => (
                <td 
                  key={column}
                  className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                >
                  {column === 'tags' ? (
                    row.tags ? (
                      <button
                        onClick={() => setSelectedTags(row.tags)}
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

      {/* Tags Dialog */}
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