export function clip(val: number, min: number, max: number, decimals: number = 2): number {
  // round to specified decimal places and clip to min and max
  const multiplier = Math.pow(10, decimals)
  return Math.round(Math.max(min, Math.min(max, val)) * multiplier) / multiplier
}
