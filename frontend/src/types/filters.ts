export interface FilterOption {
  id: string
  label: string
  category: 'Dimensions' | 'Tags' | 'Metrics'
}

export type TabType = 'Dimensions' | 'Tags' | 'Metrics' 