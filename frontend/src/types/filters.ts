export const FILTER_CATEGORIES = {
  GENERAL: 'General',
  TARGETING: 'Targeting',
  PERFORMANCE: 'Performance',
  COST: 'Cost'
} as const

export type FilterCategory = typeof FILTER_CATEGORIES[keyof typeof FILTER_CATEGORIES]

export interface FilterOption {
  id: string
  label: string
  field: string
  category: FilterCategory
}

export const FILTER_OPTIONS: FilterOption[] = [
  // General Details
  {
    id: 'creative_id',
    label: 'Creative ID',
    field: 'creative_id',
    category: FILTER_CATEGORIES.GENERAL
  },
  {
    id: 'creative_name',
    label: 'Creative Name',
    field: 'creative_name',
    category: FILTER_CATEGORIES.GENERAL
  },
  {
    id: 'tags',
    label: 'Tags',
    field: 'tags',
    category: FILTER_CATEGORIES.GENERAL
  },

  // Targeting Information
  {
    id: 'country',
    label: 'Country',
    field: 'country',
    category: FILTER_CATEGORIES.TARGETING
  },
  {
    id: 'ad_network',
    label: 'Ad Network',
    field: 'ad_network',
    category: FILTER_CATEGORIES.TARGETING
  },
  {
    id: 'os',
    label: 'OS',
    field: 'os',
    category: FILTER_CATEGORIES.TARGETING
  },
  {
    id: 'campaign',
    label: 'Campaign',
    field: 'campaign',
    category: FILTER_CATEGORIES.TARGETING
  },
  {
    id: 'ad_group',
    label: 'Ad Group',
    field: 'ad_group',
    category: FILTER_CATEGORIES.TARGETING
  },

  // Performance Metrics
  {
    id: 'ipm',
    label: 'IPM',
    field: 'ipm',
    category: FILTER_CATEGORIES.PERFORMANCE
  },
  {
    id: 'ctr',
    label: 'CTR',
    field: 'ctr',
    category: FILTER_CATEGORIES.PERFORMANCE
  },
  {
    id: 'impressions',
    label: 'Impressions',
    field: 'impressions',
    category: FILTER_CATEGORIES.PERFORMANCE
  },
  {
    id: 'clicks',
    label: 'Clicks',
    field: 'clicks',
    category: FILTER_CATEGORIES.PERFORMANCE
  },
  {
    id: 'installs',
    label: 'Installs',
    field: 'installs',
    category: FILTER_CATEGORIES.PERFORMANCE
  },

  // Cost Metrics
  {
    id: 'spend',
    label: 'Spend',
    field: 'spend',
    category: FILTER_CATEGORIES.COST
  },
  {
    id: 'cpm',
    label: 'CPM',
    field: 'cpm',
    category: FILTER_CATEGORIES.COST
  },
  {
    id: 'cost_per_click',
    label: 'Cost Per Click',
    field: 'cost_per_click',
    category: FILTER_CATEGORIES.COST
  },
  {
    id: 'cost_per_install',
    label: 'Cost Per Install',
    field: 'cost_per_install',
    category: FILTER_CATEGORIES.COST
  }
] 