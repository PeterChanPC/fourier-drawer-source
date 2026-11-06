export const Theme = {
  Light: 'light',
  Dark: 'dark',
}
export type Theme = (typeof Theme)[keyof typeof Theme]

export const Setting = {
  N: { name: 'N', val: 100, max: 1000 },
  Speed: { name: 'Speed', val: 0.1, max: 2 },
  Scale: { name: 'Scale', val: 1, max: 2 },
  CircleStrokeWidth: { name: 'Circle Stroke Width', val: 0.3, max: 1 },
  CircleStrokeOpacity: { name: 'Circle Stroke Opacity', val: 0.3, max: 1 },
  VectorStrokeWidth: { name: 'Vector Stroke Width', val: 0.3, max: 1 },
  VectorStrokeOpacity: { name: 'Vector Stroke Opacity', val: 0.6, max: 1 },
  PathStrokeWidth: { name: 'Path Stroke Width', val: 0.3, max: 1 },
  PathStrokeOpacity: { name: 'Path Stroke Opacity', val: 1, max: 1 },
}
export type Setting = typeof Setting
