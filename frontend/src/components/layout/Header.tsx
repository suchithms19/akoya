import { ChevronDown, RotateCw, MoreHorizontal, FileText } from 'lucide-react'
import metalogo from '@/assets/metalogo.png'
/**
 * Dashboard header component with title ,meta info and actions
 */
export function Header() {
  return (
    <div>
      <header className="h-16 px-6 border-b bg-white flex items-center justify-between">
        {/* Left section with document title */}
        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Untitled</span>
        </div>

        {/* Right section with meta info and actions */}
        <div className="flex items-center gap-2">
          {/* Last update info with refresh */}
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-700 font-medium">
              Updated 8 hours ago
            </span>
            <button className="p-1.5 hover:bg-gray-100 rounded-md ">
              <RotateCw className="h-4 w-4 text-gray-700 stroke-[2]" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-gray-200"></div>

          {/* Meta selector */}
          <button className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-200 rounded-md border border-gray-300 ">
            <img 
              src={metalogo}
              alt="Meta" 
              className="h-6 w-6 object-contain"
            />
            <ChevronDown className="h-3 w-3 text-gray-700" />
          </button>

          {/* Save button */}
          <button className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-200 rounded-md border border-gray-300 ">
            Save
          </button>

          {/* More options menu */}
          <button className="p-1.5 bg-white hover:bg-gray-200 rounded-md border border-gray-300 ">
            <MoreHorizontal className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Title Section */}
      <div className="px-6 py-16 bg-white border-b">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-6 w-6 text-gray-900" />
          <h1 className="text-3xl font-semibold text-gray-900">
          Untitled
          </h1>
        </div>
        <p className="text-gray-500 text-sm">
          Type a description for this report
        </p>
      </div>
    </div>
  )
} 