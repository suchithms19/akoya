import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { FilterButton } from "@/components/filters/FilterButton"
import { FilterTabs } from "@/components/filters/FilterTabs"
import { SearchBar } from "@/components/filters/SearchBar"
import { FilterOptions } from "@/components/filters/FilterOptions"
import { AddFilterButton } from "@/components/filters/AddFilterButton"

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
    <div className="min-h-screen bg-white p-6">
      <Header />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <FilterButton onClick={() => setIsOpen(!isOpen)} />

        {/* Filter Dropdown */}
        {isOpen && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border">
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
  )
}

