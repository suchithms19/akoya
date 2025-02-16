import { FILTER_OPTIONS, FilterCategory } from "@/types/filters"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

interface FilterOptionsProps {
  activeTab: FilterCategory
  searchQuery: string
  onSelect: (filterId: string) => void
  selectedFilters: string[]
}

/**
 * List of filterable options that can be selected
 */
export function FilterOptions({ 
  activeTab, 
  searchQuery, 
  onSelect,
  selectedFilters 
}: FilterOptionsProps) {
  const filteredOptions = FILTER_OPTIONS
    .filter((option) => {
      const matchesCategory = !searchQuery ? option.category === activeTab : true
      const matchesSearch = option.label.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (searchQuery) {
        // When searching, group by category
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category)
        }
      }
      return a.label.localeCompare(b.label)
    })

  const renderCategoryLabel = (category: FilterCategory, index: number) => {
    const prevOption = filteredOptions[index - 1]
    if (!prevOption || prevOption.category !== category) {
      return (
        <div className="text-xs font-medium text-gray-500 px-4 py-2">
          {category}
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-1 max-h-[300px] overflow-y-auto">
        {filteredOptions.map((option, index) => {
          const isSelected = selectedFilters.includes(option.id)
          
          return (
            <div key={option.id}>
              {searchQuery && renderCategoryLabel(option.category, index)}
              <button
                onClick={() => onSelect(option.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md text-sm transition-colors",
                  isSelected 
                    ? "bg-lightgreen text-darkgreen font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {option.label}
              </button>
            </div>
          )
        })}
        
        {filteredOptions.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-4">
            No matching filters found
          </div>
        )}
      </div>

      {/* Search Hint */}
      <div className="flex items-center gap-2 px-4 py-2 mt-2 bg-gray-50 text-xs text-gray-500 border-t">
        <Info className="h-3 w-3" />
        <span>Tip: Spaces affect filter results</span>
      </div>
    </div>
  )
} 