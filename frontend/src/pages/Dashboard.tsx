import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { FilterButton } from "@/components/filters/FilterButton"
import { FilterTabs } from "@/components/filters/FilterTabs"
import { SearchBar } from "@/components/filters/SearchBar"
import { FilterOptions } from "@/components/filters/FilterOptions"
import { DateRange } from "@/components/filters/DateRange"
import { DataTable } from '@/components/table/DataTable'
import { FILTER_CATEGORIES, FilterCategory } from "@/types/filters"

/**
 * Main dashboard page component that manages the filter interface
 */
export default function Dashboard() {
  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<FilterCategory>(FILTER_CATEGORIES.PERFORMANCE)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId)
      }
      return [...prev, filterId]
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="p-6">
        <div>
          {/* Filter Controls */}
          <div className="flex items-center gap-3 mb-4">
            <DateRange />
            <div className="relative ">
              <FilterButton onClick={() => setIsOpen(!isOpen)} />
              
              {/* Filter Dropdown */}
              {isOpen && (
                <div className="absolute left-0 top-[calc(100%+4px)] w-[320px] p-3 bg-white rounded-md border border-gray-200 shadow-lg z-10">
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
                    selectedFilters={selectedFilters}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Add the DataTable */}
        <div className="mt-6">
          <DataTable />
        </div>
      </div>
    </div>
  )
}
