import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Main layout component that wraps the application content
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
} 