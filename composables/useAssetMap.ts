export const assetLabelToValue = {
    'All assets': 'all',
    '3D Illustrations': '3d',
    'Lottie Animations': 'lottie',
    'Illustrations': 'illustration',
    'Icons': 'icon'
  } as const
  
  export const assetValueToLabel = Object.fromEntries(
    Object.entries(assetLabelToValue).map(([label, value]) => [value, label])
  ) as Record<(typeof assetLabelToValue)[keyof typeof assetLabelToValue], keyof typeof assetLabelToValue>
  
  export const assetLabels = Object.keys(assetLabelToValue) as (keyof typeof assetLabelToValue)[]
  export const assetValues = Object.values(assetLabelToValue)
  export type Asset = typeof assetLabelToValue[keyof typeof assetLabelToValue]

  