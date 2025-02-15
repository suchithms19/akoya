import { cn } from "@/lib/utils"

interface FilterTabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

/**
 * Navigation tabs for different filter categories
 */
export function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex gap-4 border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "pb-2 px-1",
            activeTab === tab ? "border-b-2 border-gray-800 text-gray-900 font-medium" : "text-gray-500",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
} 