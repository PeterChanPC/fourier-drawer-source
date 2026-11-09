export const Theme = {
  Light: 'light',
  Dark: 'dark',
}
export type Theme = (typeof Theme)[keyof typeof Theme]

export const Setting = {
  N: { name: 'N', val: 50, min: 2, max: 100, step: 2 },
  Speed: { name: 'Speed', val: 0.1, min: 0.01, max: 1, step: 0.01 },
  Scale: { name: 'Scale', val: 1, min: 0.1, max: 2, step: 0.1 },
  CircleStrokeWidth: { name: 'Circle Stroke Width', val: 0.3, min: 0.1, max: 1, step: 0.1 },
  CircleStrokeOpacity: { name: 'Circle Stroke Opacity', val: 0.3, min: 0.1, max: 1, step: 0.1 },
  VectorStrokeWidth: { name: 'Vector Stroke Width', val: 0.3, min: 0.1, max: 1, step: 0.1 },
  VectorStrokeOpacity: { name: 'Vector Stroke Opacity', val: 0.3, min: 0.1, max: 1, step: 0.1 },
  PathStrokeWidth: { name: 'Path Stroke Width', val: 0.3, min: 0.1, max: 1, step: 0.1 },
  PathStrokeOpacity: { name: 'Path Stroke Opacity', val: 1, min: 0.1, max: 1, step: 0.1 },
}
export type Setting = typeof Setting
