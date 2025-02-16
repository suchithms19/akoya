/**
 * Navigation item interface for sidebar menu items
 */
export interface NavItem {
  title: string
  path: string
  icon: string
  section: 'main' | 'metrics'
}

/**
 * Main navigation items for the top of the sidebar
 */
export const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    path: '/home',
    icon: 'home',
    section: 'main'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: 'file-text',
    section: 'main'
  },
  {
    title: 'Alerts',
    path: '/alerts',
    icon: 'bell',
    section: 'main'
  }
]

/**
 * Metric navigation items for the bottom section of the sidebar
 */
export const metricNavItems: NavItem[] = [
  {
    title: 'Conversion Rate',
    path: '/metrics/conversion',
    icon: 'percent',
    section: 'metrics'
  },
  {
    title: 'User Engagement',
    path: '/metrics/engagement',
    icon: 'activity',
    section: 'metrics'
  },
  {
    title: 'Revenue Growth',
    path: '/metrics/revenue',
    icon: 'trending-up',
    section: 'metrics'
  }
] 