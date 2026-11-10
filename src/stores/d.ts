import * as utils from '@/utils/utils'

export const Theme = {
  Light: 'light',
  Dark: 'dark',
}
export type Theme = (typeof Theme)[keyof typeof Theme]

export const Setting = {
  N: {
    name: 'N',
    val: 50,
    min: 2,
    max: 100,
    step: 2,
    clipper: (val: number): number => utils.clip(val, Setting.N.min, Setting.N.max),
  },
  Speed: {
    name: 'Speed',
    val: 0.1,
    min: 0.01,
    max: 1,
    step: 0.01,
    clipper: (val: number): number => utils.clip(val, Setting.Speed.min, Setting.Speed.max),
  },
  Scale: {
    name: 'Scale',
    val: 1,
    min: 0.1,
    max: 5,
    step: 0.1,
    clipper: (val: number): number => utils.clip(val, Setting.Scale.min, Setting.Scale.max),
  },
  CircleStrokeWidth: {
    name: 'Circle Stroke Width',
    val: 0.3,
    min: 0.1,
    max: 1,
    step: 0.1,
    clipper: (val: number): number =>
      utils.clip(val, Setting.CircleStrokeWidth.min, Setting.CircleStrokeWidth.max),
  },
  CircleStrokeOpacity: {
    name: 'Circle Stroke Opacity',
    val: 0.3,
    min: 0.1,
    max: 1,
    step: 0.1,
    clipper: (val: number): number =>
      utils.clip(val, Setting.CircleStrokeOpacity.min, Setting.CircleStrokeOpacity.max),
  },
  VectorStrokeWidth: {
    name: 'Vector Stroke Width',
    val: 0.3,
    min: 0.1,
    max: 1,
    step: 0.1,
    clipper: (val: number): number =>
      utils.clip(val, Setting.VectorStrokeWidth.min, Setting.VectorStrokeWidth.max),
  },
  VectorStrokeOpacity: {
    name: 'Vector Stroke Opacity',
    val: 0.3,
    min: 0.1,
    max: 1,
    step: 0.1,
    clipper: (val: number): number =>
      utils.clip(val, Setting.VectorStrokeOpacity.min, Setting.VectorStrokeOpacity.max),
  },
  PathStrokeWidth: {
    name: 'Path Stroke Width',
    val: 0.3,
    min: 0.1,
    max: 1,
    step: 0.1,
    clipper: (val: number): number =>
      utils.clip(val, Setting.PathStrokeWidth.min, Setting.PathStrokeWidth.max),
  },
  PathStrokeOpacity: {
    name: 'Path Stroke Opacity',
    val: 1,
    min: 0.1,
    max: 1,
    step: 0.1,
    clipper: (val: number): number =>
      utils.clip(val, Setting.PathStrokeOpacity.min, Setting.PathStrokeOpacity.max),
  },
}
export type Setting = typeof Setting
