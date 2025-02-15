interface FilterOptionsProps {
  options: string[]
  searchQuery: string
}

/**
 * List of filterable options that can be selected
 */
export function FilterOptions({ options, searchQuery }: FilterOptionsProps) {
  const filteredOptions = options.filter((option) => 
    option.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-2">
      {filteredOptions.map((option) => (
        <button
          key={option}
          className="w-full text-left px-4 py-3 rounded-md hover:bg-[#f2f4f8] text-gray-700"
        >
          {option}
        </button>
      ))}
    </div>
  )
} 