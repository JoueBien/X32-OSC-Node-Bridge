import { filledArray } from "@/shared/utils/filledArray"

export type FixedArray<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength
}

export type ARG_Fixed<TLength extends number> = FixedArray<number, TLength>

// TODO: Re-type all these as FixedArray instead of silly lists

export type ARG_32 = FixedArray<number, 32>

export type ARG_64 = FixedArray<number, 64>

export type ARG_2 = FixedArray<number, 2>

export type ARG_3 = FixedArray<number, 3>

export type ARG_4 = FixedArray<number, 4>

export type ARG_6 = FixedArray<number, 6>

export type ARG_8 = FixedArray<number, 8>

export type ARG_16 = FixedArray<number, 16>

// export const ARRAY_32: ARG_32 = new Array<number>(32).fill(0.5) as ARG_32
// export const ARRAY_8: ARG_8 = new Array<number>(8).fill(0.5) as ARG_8
export const ARRAY_8: ARG_8 = filledArray(8, 0)
export const ARRAY_32: ARG_32 = filledArray(32, 0)
export const ARRAY_64: ARG_64 = filledArray(64, 0)
export const ARRAY_16: ARG_16 = filledArray(16, 0)

export type ARG_STR_64 = FixedArray<string, 64>

export type ARG_STR_32 = FixedArray<string, 32>
export type ARG_STR_2 = FixedArray<string, 2>

export type ARG_STR_3 = FixedArray<string, 3>

export type ARG_STR_4 = FixedArray<string, 4>

export type ARG_STR_6 = FixedArray<string, 6>

export type ARG_STR_8 = FixedArray<string, 8>

export type ARG_STR_16 = FixedArray<string, 16>
