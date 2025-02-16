import { cn } from "@/lib/utils"
import { FILTER_CATEGORIES, FilterCategory } from "@/types/filters"

interface FilterTabsProps {
  activeTab: FilterCategory
  onTabChange: (tab: FilterCategory) => void
}

/**
 * Navigation tabs for different filter categories
 */
export function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex gap-4 border-b mb-4">
      {Object.values(FILTER_CATEGORIES).map((category) => (
        <button
          key={category}
          onClick={() => onTabChange(category)}
          className={cn(
            "pb-2 px-1 text-sm",
            activeTab === category 
              ? "border-b-2 border-darkgreen text-gray-900 font-medium" 
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
} 