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
      className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-[#f2f4f8] rounded-md hover:bg-gray-100"
    >
      <Filter className="h-4 w-4" />
      <span>Filters</span>
    </button>
  )
} 