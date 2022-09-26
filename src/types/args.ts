export type ARG_32 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export type ARG_2 = [
  number,
  number
]

export type ARG_3 = [
  number,
  number,
  number
]

export type ARG_4 = [
  number,
  number,
  number,
  number
]

export type ARG_6 = [
  number,
  number,
  number,
  number,
  number,
  number
]

export type ARG_8 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export type ARG_16 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]


// export const ARRAY_32: ARG_32 = new Array<number>(32).fill(0.5) as ARG_32
// export const ARRAY_8: ARG_8 = new Array<number>(8).fill(0.5) as ARG_8
export const ARRAY_8: ARG_8 = [
  0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.45,
]
export const ARRAY_32: ARG_32 = [...ARRAY_8, ...ARRAY_8, ...ARRAY_8, ...ARRAY_8]
export const ARRAY_16 : ARG_16 = [...ARRAY_8, ...ARRAY_8] 
