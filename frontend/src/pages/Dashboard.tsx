import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { FilterButton } from "@/components/filters/FilterButton"
import { FilterTabs } from "@/components/filters/FilterTabs"
import { SearchBar } from "@/components/filters/SearchBar"
import { FilterOptions } from "@/components/filters/FilterOptions"
import { AddFilterButton } from "@/components/filters/AddFilterButton"
import { DateRange } from "@/components/filters/DateRange"

/**
 * Main dashboard page component that manages the filter interface
 */
export default function Dashboard() {
  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("Tags")
  const [searchQuery, setSearchQuery] = useState("")

  // Constants
  const tabs = ["Dimensions", "Tags", "Metrics"]
  const filterOptions = ["Character", "Background", "Elements", "CTA Position", "CTA Text"]

  const handleAddFilter = () => {
    // Handle adding filter logic
    console.log("Adding new filter")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="p-6">
        <div>
          {/* Filter Controls */}
          <div className="flex items-center gap-3 mb-4">
            <DateRange />
            <div className="relative">
              <FilterButton onClick={() => setIsOpen(!isOpen)} />
              
              {/* Filter Dropdown */}
              {isOpen && (
                <div className="absolute left-0  top-11 w-[320px] p-3 bg-white rounded-md border border-gray-200 shadow-lg z-10">
                  <AddFilterButton onClick={handleAddFilter} />
                  <SearchBar 
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                  <FilterTabs 
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                  <FilterOptions 
                    options={filterOptions}
                    searchQuery={searchQuery}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

