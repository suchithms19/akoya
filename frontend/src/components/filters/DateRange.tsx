import { Calendar } from "lucide-react"

/**
 * Date range selector component
 */
export function DateRange() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white hover:bg-gray-200 rounded-md border border-gray-300 " >
      <Calendar className="h-4 w-4 text-gray-500" />
      <span className="text-sm font-medium">Last 7 days</span>
      <span className="text-sm text-gray-500">Jan 14 - 27, 2025</span>
    </button>
  )
} 