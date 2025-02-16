import { useState, useMemo } from "react"
import { Header } from "@/components/layout/Header"
import { FilterButton } from "@/components/filters/FilterButton"
import { FilterTabs } from "@/components/filters/FilterTabs"
import { SearchBar } from "@/components/filters/SearchBar"
import { FilterOptions } from "@/components/filters/FilterOptions"
import { DateRange } from "@/components/filters/DateRange"
import { DataTable } from '@/components/table/DataTable'
import { FILTER_CATEGORIES, FilterCategory, FilterOption, AppliedFilter } from "@/types/filters"
import { FilterValueInput } from '@/components/filters/FilterValueInput'
import { AppliedFilters } from '@/components/filters/AppliedFilters'
import { FILTER_OPTIONS } from '@/types/filters'
import reportData from '@/assets/report.json'
import { Search } from "lucide-react"

/**
 * Main dashboard page component that manages the filter interface
 */
export default function Dashboard() {
  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<FilterCategory>(FILTER_CATEGORIES.GENERAL)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(null)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])
  const [tableSearchQuery, setTableSearchQuery] = useState("")

  // Filter the data based on applied filters first
  const filteredData = useMemo(() => {
    return reportData.filter(row => {
      return appliedFilters.every(filter => {
        const value = row[filter.filter.field as keyof typeof row]
        const filterValue = filter.value

        switch (filterValue.operator) {
          case 'equals':
            return value?.toString().toLowerCase() === filterValue.value.toString().toLowerCase()
          
          case 'contains':
            if (filter.filter.field === 'tags') {
              // Special handling for tags
              const tags = JSON.stringify(value).toLowerCase()
              return tags.includes(filterValue.value.toLowerCase())
            }
            return value?.toString().toLowerCase().includes(filterValue.value.toLowerCase())
          
          case 'greater':
            return Number(value) > Number(filterValue.value)
          
          case 'less':
            return Number(value) < Number(filterValue.value)
          
          case 'between':
            const num = Number(value)
            return num >= Number(filterValue.value) && num <= Number(filterValue.secondValue)
          
          default:
            return true
        }
      })
    })
  }, [appliedFilters])

  const handleFilterSelect = (filterId: string) => {
    const filter = FILTER_OPTIONS.find(f => f.id === filterId)
    if (filter) {
      setSelectedFilter(filter)
    }
  }

  const handleFilterValueChange = (value: any) => {
    if (selectedFilter) {
      setAppliedFilters(prev => [
        ...prev,
        {
          filter: selectedFilter,
          value
        }
      ])
      setSelectedFilter(null)
      setIsOpen(false)
    }
  }

  const handleRemoveFilter = (filterId: string) => {
    setAppliedFilters(prev => prev.filter(f => f.filter.id !== filterId))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="p-6">
        <div>
          {/* Filter Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <DateRange />
              <div className="relative">
                <FilterButton onClick={() => setIsOpen(!isOpen)} />
                
                {/* Filter Dropdown */}
                {isOpen && (
                  <div className="absolute left-0 top-[calc(100%+4px)] w-[320px] bg-white rounded-md border border-gray-200 shadow-lg z-10">
                    {selectedFilter ? (
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{selectedFilter.label}</h3>
                          <button 
                            onClick={() => setSelectedFilter(null)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            ✕
                          </button>
                        </div>
                        <FilterValueInput
                          filter={selectedFilter}
                          onValueChange={handleFilterValueChange}
                        />
                      </div>
                    ) : (
                      <div className="p-3">
                        <SearchBar 
                          value={searchQuery}
                          onChange={setSearchQuery}
                        />
                        <FilterTabs 
                          activeTab={activeTab}
                          onTabChange={setActiveTab}
                        />
                        <FilterOptions 
                          activeTab={activeTab}
                          searchQuery={searchQuery}
                          onSelect={handleFilterSelect}
                          selectedFilters={appliedFilters.map(f => f.filter.id)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Table Search */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search in table..."
                value={tableSearchQuery}
                onChange={(e) => setTableSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lightgreen text-sm"
              />
              {tableSearchQuery && (
                <button
                  onClick={() => setTableSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Applied Filters */}
          <AppliedFilters 
            filters={appliedFilters}
            onRemove={handleRemoveFilter}
          />
        </div>
        
        {/* DataTable */}
        <div className="mt-6">
          <DataTable 
            data={filteredData}
            searchQuery={tableSearchQuery}
            onSearchChange={setTableSearchQuery}
          />
        </div>
      </div>
    </div>
  )
}
