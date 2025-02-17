import { useLocation, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { mainNavItems, metricNavItems } from '@/types/navigation'
import * as Icons from 'lucide-react'
import { Plus } from 'lucide-react'
import segwiseLogo from '@/assets/segwise_ai_logo.jpg'

/**
 * Sidebar component that provides navigation for the application
 */
export function Sidebar() {
  const location = useLocation()

  /**
   * Renders a navigation item with proper styling and icon
   */
  const NavItem = ({ title, path, icon }: { title: string; path: string; icon: string }) => {
    const isActive = location.pathname === path
    const Icon = Icons[icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>

    return (
      <Link
        to={path}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          "hover:bg-gray-100 hover:text-darkgreen",
          isActive ? "bg-lightgreen text-darkgreen font-medium" : "text-gray-600"
        )}
      >
        {Icon && <Icon className="h-5 w-5" />}
        <span>{title}</span>
      </Link>
    )
  }

  return (
    <aside className="w-64 h-screen border-r bg-white p-4 flex flex-col">
      {/* Logo Section */}
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={segwiseLogo} 
            alt="Segwise AI logo" 
            className="h-8 w-8 rounded"
          />
          <span className="text-xl font-bold text-darkgreen">Segwise</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1 mb-8">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.path}
            title={item.title}
            path={item.path}
            icon={item.icon}
          />
        ))}
      </nav>

      {/* Metrics Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Metrics
        </h2>
        <nav className="space-y-1">
          {metricNavItems.map((item) => (
            <NavItem
              key={item.path}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
          
          {/* Add Metric Button */}
          <button
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-darkgreen"
            onClick={() => console.log('Add metric clicked')}
          >
            <Plus className="h-5 w-5" />
            <span>Add Metric</span>
          </button>
        </nav>
      </div>
    </aside>
  )
} 