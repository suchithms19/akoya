import { X, ExternalLink } from 'lucide-react'

interface RowPreviewProps {
  data: Record<string, any>
  onClose: () => void
  onViewFullDetails: (data: Record<string, any>) => void
}

/**
 * A compact preview component that appears in the bottom-right corner
 * showing key information about a selected row
 */
export function RowPreview({ data, onClose, onViewFullDetails }: RowPreviewProps) {
  // Key metrics to show in preview
  const previewFields = ['creative_name', 'campaign', 'impressions', 'clicks', 'installs']

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-medium text-sm">Quick Preview</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content - Showing only key metrics */}
      <div className="p-4">
        <div className="space-y-3">
          {previewFields.map((key) => (
            <div key={key} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-500">
                {key.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
              <span className="text-sm text-gray-900">
                {data[key]?.toString() || '-'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t">
        <button 
          onClick={() => onViewFullDetails(data)}
          className="w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          View Full Details
        </button>
      </div>
    </div>
  )
} 