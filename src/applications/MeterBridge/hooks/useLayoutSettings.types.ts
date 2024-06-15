import { FixedArray } from "@/types/args"

export enum Source {
  ChannelGain = 0, // meters/1
  ChannelGate = 1,
  ChannelComp = 2,

  BusMasterLevel = 3, // Meters/2
  BusMatrixLevel = 4,
  BussLRCLevel = 5,

  BusMasterComp = 6,
  BusMatrixComp = 7,
  BussLRCComp = 8,
  AuxSendLevel = 9, // Meters/3
  AuxReturnLevel = 10,
  StFxReturnLevel = 11,
}

/** Fast look up for Source labels */
export const SourceLabels = [
  "GAIN/TRIM",
  "CH GATE",
  "CH COMP",
  "BUS",
  "MATRIX",
  "LRC",
  "BUS COMP",
  "MATRIX COMP",
  "LRC COMP",
  "AUX SEND",
  "AUX RETURN",
  "FX Return",
]

export const SourceLabelsMasterLevel = ["LEFT", "RIGHT", "MONO"]

/** Fast look up for Source Reduction */
export const IsIndexREduction = [
  false, // "GAIN/TRIM",
  true, // "CH GATE",
  true, // "CH COMP",
  false, // "BUS",
  false, // "MATRIX",
  false, // "LRC",
  true, // "BUS COMP",
  true, // "MATRIX COMP",
  true, // "LRC COMP",
  false, // "AUX SEND",
  false, // "AUX RETURN",
  false, // "FX Return",
]

export type MeterLayoutItem =
  | {
      source: Source
      /** The index of the channel/bus/aux */
      from: number
    }
  | "off"
// [ROW][column]

export type SelectedMeterPosition = [number, number] | "off"
export type MeterLayout = FixedArray<FixedArray<MeterLayoutItem, 96>, 8>
