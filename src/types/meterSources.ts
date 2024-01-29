import { FixedArray } from "./args"

export type METER_SOURCES_LABEL = {
  label: string
  value: number
}

export type METER_POSITION_SOURCES_LABEL = {
  label: string
  value: number
}

// 0-71 Where the meter is from
export const METER_SOURCES_LABELS: FixedArray<string, 6> = [
  "Channel 1",
  "Channel 2",
  "Channel 3",
  "Channel 4",
  "Channel 5",
  "Channel 6",
]

export const METER_SOURCES_LABELS_OPTIONS =
  METER_SOURCES_LABELS.map<METER_SOURCES_LABEL>((label, index) => ({
    label,
    value: index,
  })) as FixedArray<METER_SOURCES_LABEL, 6>

// Which Point the meter is sourced from
export const METER_POSITION_SOURCES_LABELS: FixedArray<string, 4> = [
  "Post Gain",
  "Gate Threshold",
  "Compressor Threshold",
  "Post Fader",
]

export const METER_POSITION_SOURCES_LABELS_OPTIONS =
  METER_POSITION_SOURCES_LABELS.map<METER_POSITION_SOURCES_LABEL>(
    (label, index) => ({
      label,
      value: index,
    })
  ) as FixedArray<METER_POSITION_SOURCES_LABEL, 4>
