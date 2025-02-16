import { Filter } from "lucide-react"

interface FilterButtonProps {
  onClick: () => void
}

/**
 * Button component that toggles the filter interface
 */
export function FilterButton({ onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white hover:bg-gray-200 rounded-md border border-gray-300"
    >
      <Filter className="h-4 w-4 text-gray-500" />
      <span className="text-sm font-medium">Filters</span>
    </button>
  )
} 