import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

/**
 * Main layout component that wraps the application content
 */
export function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
} 