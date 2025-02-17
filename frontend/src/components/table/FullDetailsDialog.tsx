import { X, Tag } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { motion, AnimatePresence } from 'framer-motion'

interface FullDetailsDialogProps {
  data: Record<string, any>
  isOpen: boolean
  onClose: () => void
}

type ColorMap = {
  [key: string]: string
}

/**
 * A full-screen dialog showing all details of a row
 */
export function FullDetailsDialog({ data, isOpen, onClose }: FullDetailsDialogProps) {
  // Group metrics by category
  const metricGroups = {
    'Performance Metrics': [
      'impressions',
      'clicks',
      'installs',
      'ipm',
      'ctr'
    ],
    'Cost Metrics': [
      'spend',
      'cpm',
      'cost_per_click',
      'cost_per_install'
    ],
    'Targeting Info': [
      'country',
      'ad_network',
      'os',
      'campaign',
      'ad_group'
    ],
    'Basic Info': [
      'creative_id',
      'creative_name'
    ]
  }

  const colors: ColorMap = {
    // Performance colors
    impressions: 'bg-blue-50 text-blue-700 border-blue-200',
    clicks: 'bg-blue-50 text-blue-700 border-blue-200',
    installs: 'bg-blue-50 text-blue-700 border-blue-200',
    ipm: 'bg-blue-50 text-blue-700 border-blue-200',
    ctr: 'bg-blue-50 text-blue-700 border-blue-200',
    
    // Cost colors
    spend: 'bg-rose-50 text-rose-700 border-rose-200',
    cpm: 'bg-rose-50 text-rose-700 border-rose-200',
    cost_per_click: 'bg-rose-50 text-rose-700 border-rose-200',
    cost_per_install: 'bg-rose-50 text-rose-700 border-rose-200',
    
    // Targeting colors
    country: 'bg-lime-50 text-lime-700 border-lime-200',
    ad_network: 'bg-lime-50 text-lime-700 border-lime-200',
    os: 'bg-lime-50 text-lime-700 border-lime-200',
    campaign: 'bg-lime-50 text-lime-700 border-lime-200',
    ad_group: 'bg-lime-50 text-lime-700 border-lime-200',
    
    // Basic info colors
    creative_id: 'bg-violet-50 text-violet-700 border-violet-200',
    creative_name: 'bg-violet-50 text-violet-700 border-violet-200'
  }

  const renderMetricCard = (field: string, value: any) => {
    const isNumeric = ['impressions', 'clicks', 'installs', 'spend', 'cpm'].includes(field)
    const isPercentage = ['ctr', 'ipm'].includes(field)
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition-all ${colors[field as keyof ColorMap] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
      >
        <div className="text-sm font-medium opacity-80 mb-1">
          {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
        <div className="text-xl font-semibold">
          {isNumeric ? Number(value).toLocaleString() : 
           isPercentage ? `${Number(value).toFixed(2)}%` : 
           value?.toString() || '-'}
        </div>
      </motion.div>
    )
  }

  const renderTags = (tags: Record<string, any>) => {
    const isTestCreative = (tags: any) => {
      return Array.isArray(tags.Concepts) || 
             Array.isArray(tags.Audio) || 
             Array.isArray(tags.EndCardElements)
    }

    if (isTestCreative(tags)) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg mt-8 border shadow-sm"
        >
          <div className="flex items-center gap-2 mb-6">
            <Tag className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-900">Creative Tags</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Concepts Section */}
            {Array.isArray(tags.Concepts) && (
              <motion.div
                key="concepts"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm"
              >
                <h4 className="text-sm font-medium text-indigo-900 mb-3">Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.Concepts.map((concept: string, index: number) => (
                    <span 
                      key={`concept-${concept}-${index}`}
                      className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-100"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Audio Section */}
            {Array.isArray(tags.Audio) && (
              <motion.div
                key="audio"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm"
              >
                <h4 className="text-sm font-medium text-purple-900 mb-3">Audio</h4>
                <div className="space-y-3">
                  {tags.Audio.map((audio: any, index: number) => (
                    <div 
                      key={`audio-${audio.Type}-${audio.Language}-${index}`}
                      className="bg-purple-50 p-3 rounded-lg border border-purple-100"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(audio).map(([key, value]) => (
                          <div key={`audio-${index}-${key}`} className="space-y-1">
                            <span className="text-xs font-medium text-purple-700">{key}</span>
                            <span className="text-sm text-purple-900 block">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* End Card Elements Section */}
            {Array.isArray(tags.EndCardElements) && (
              <motion.div
                key="endcard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-lg border border-teal-100 shadow-sm col-span-full"
              >
                <h4 className="text-sm font-medium text-teal-900 mb-3">End Card Elements</h4>
                <div className="space-y-4">
                  {tags.EndCardElements.map((element: any, elementIndex: number) => (
                    <div 
                      key={`endcard-${elementIndex}-${Object.keys(element).join('-')}`}
                      className="bg-teal-50 p-4 rounded-lg border border-teal-100 space-y-3"
                    >
                      {Object.entries(element).map(([key, value]) => (
                        <div key={`endcard-${elementIndex}-${key}`}>
                          <span className="text-xs font-medium text-teal-700 block mb-1">{key}</span>
                          {Array.isArray(value) ? (
                            <div className="flex flex-wrap gap-2">
                              {(value as string[]).map((item, i) => (
                                <span
                                  key={`endcard-${elementIndex}-${key}-${item}-${i}`}
                                  className="px-3 py-1.5 bg-white text-teal-700 rounded-full text-sm border border-teal-200"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-teal-900">{String(value)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )
    }

    // Regular tags rendering with improved styling
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg mt-8 border shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Tag className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-gray-900">Creative Tags</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(tags).map(([category, values], categoryIndex) => (
            <motion.div 
              key={`${category}-${categoryIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm"
            >
              <h4 className="text-sm font-medium text-indigo-900 mb-3">
                {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h4>
              {typeof values === 'object' ? (
                <div className="space-y-2">
                  {Object.entries(values).map(([key, value], valueIndex) => (
                    <div key={`${category}-${key}-${valueIndex}`} className="flex flex-col">
                      <span className="text-xs font-medium text-indigo-700">{key}</span>
                      {Array.isArray(value) ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {value.map((item, i) => (
                            <span 
                              key={`${category}-${key}-${item}-${i}`}
                              className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-100"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-indigo-900">{String(value)}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-indigo-900">{String(values)}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Creative Details</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {data.creative_name || data.creative_id}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="space-y-8">
                {/* All Metrics by Category */}
                {Object.entries(metricGroups).map(([category, fields], groupIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {fields.map((field, index) => (
                        <motion.div
                          key={`${category}-${field}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (groupIndex * 0.1) + (index * 0.05) }}
                        >
                          {renderMetricCard(field, data[field])}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Tags Section */}
                {data.tags && renderTags(data.tags)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  )
} 