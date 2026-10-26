export const Theme = {
  Light: 'light',
  Dark: 'dark',
}
export type Theme = (typeof Theme)[keyof typeof Theme]

export const DefaultSetting = {
  N: 100,
  Speed: 1,
  Scale: 1,
  CircleStrokeWidth: 1,
  CircleStrokeOpacity: 1,
  VectorStrokeWidth: 1,
  VectorStrokeOpacity: 1,
  PathStrokeWidth: 1,
  PathStrokeOpacity: 1,
}
export type Setting = typeof DefaultSetting
