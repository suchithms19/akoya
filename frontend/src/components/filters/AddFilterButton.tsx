import { Plus } from "lucide-react"

interface AddFilterButtonProps {
  onClick: () => void
}

/**
 * Button component for adding new filters
 */
export function AddFilterButton({ onClick }: AddFilterButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-2 px-4 py-3 bg-[#f6fded] text-gray-800 font-semibold rounded-lg mb-4 hover:bg-lightgreen"
    >
      <Plus className="h-5 w-5" />
      <span>Add Filter</span>
    </button>
  )
} 