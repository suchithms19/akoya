import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

/**
 * Search input for filtering options
 */
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lightgreen"
      />
    </div>
  )
} 