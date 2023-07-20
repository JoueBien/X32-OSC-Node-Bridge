export const FX_SOURCE_LABELS_1_4 = {
  0: "Insert",
  1: "Bus 1",
  2: "Bus 2",
  3: "Bus 3",
  4: "Bus 4",
  5: "Bus 5",
  6: "Bus 6",
  7: "Bus 7",
  8: "Bus 8",
  9: "Bus 9",
  10: "Bus 10",
  11: "Bus 11",
  12: "Bus 12",
  13: "Bus 13",
  14: "Bus 14",
  15: "Bus 15",
  16: "Bus 16",
  17: "M/C",
}

export enum FX_SOURCE_1_4 {
  "Insert" = 0,
  "Bus 1" = 1,
  "Bus 2" = 2,
  "Bus 3" = 3,
  "Bus 4" = 4,
  "Bus 5" = 5,
  "Bus 6" = 6,
  "Bus 7" = 7,
  "Bus 8" = 8,
  "Bus 9" = 9,
  "Bus 10" = 10,
  "Bus 11" = 11,
  "Bus 12" = 12,
  "Bus 13" = 13,
  "Bus 14" = 14,
  "Bus 15" = 15,
  "Bus 16" = 16,
  "M/C" = 17,
}

export type FxSourceType = typeof FX_SOURCE_1_4[keyof typeof FX_SOURCE_1_4]

export const FX_INSERT_LABELS = {
  0: "Off",
  1: "Channel 1",
  2: "Channel 2",
  3: "Channel 3",
  4: "Channel 4",
  5: "Channel 5",
  6: "Channel 6",
  7: "Channel 7",
  8: "Channel 8",
  9: "Channel 9",
  10: "Channel 10",
  11: "Channel 11",
  12: "Channel 12",
  13: "Channel 13",
  14: "Channel 14",
  15: "Channel 15",
  16: "Channel 16",
  17: "Channel 17",
  18: "Channel 18",
  19: "Channel 19",
  20: "Channel 20",
  21: "Channel 21",
  22: "Channel 22",
  23: "Channel 23",
  24: "Channel 24",
  25: "Channel 25",
  26: "Channel 26",
  27: "Channel 27",
  28: "Channel 28",
  29: "Channel 29",
  30: "Channel 30",
  31: "Channel 31",
  32: "Channel 32",
  33: "Bus 1",
  34: "Bus 2",
  35: "Bus 3",
  36: "Bus 4",
  37: "Bus 5",
  38: "Bus 6",
  39: "Bus 7",
  40: "Bus 8",
  41: "Bus 9",
  42: "Bus 10",
  43: "Bus 11",
  44: "Bus 12",
  45: "Bus 13",
  46: "Bus 14",
  47: "Bus 15",
  48: "Bus 16",
  49: "MX1",
  50: "MX2",
  51: "MX3",
  52: "MX4",
  53: "MX5",
  54: "MX6",
  55: "Master LR",
  56: "Master C",
}

export enum FX_INSERT {
  "Off" = 0,
  "Channel 1" = 1,
  "Channel 2" = 2,
  "Channel 3" = 3,
  "Channel 4" = 4,
  "Channel 5" = 5,
  "Channel 6" = 6,
  "Channel 7" = 7,
  "Channel 8" = 8,
  "Channel 9" = 9,
  "Channel 10" = 10,
  "Channel 11" = 11,
  "Channel 12" = 12,
  "Channel 13" = 13,
  "Channel 14" = 14,
  "Channel 15" = 15,
  "Channel 16" = 16,
  "Channel 17" = 17,
  "Channel 18" = 18,
  "Channel 19" = 19,
  "Channel 20" = 20,
  "Channel 21" = 21,
  "Channel 22" = 22,
  "Channel 23" = 23,
  "Channel 24" = 24,
  "Channel 25" = 25,
  "Channel 26" = 26,
  "Channel 27" = 27,
  "Channel 28" = 28,
  "Channel 29" = 29,
  "Channel 30" = 30,
  "Channel 31" = 31,
  "Channel 32" = 32,
  "Bus 1" = 33,
  "Bus 2" = 34,
  "Bus 3" = 35,
  "Bus 4" = 36,
  "Bus 5" = 37,
  "Bus 6" = 38,
  "Bus 7" = 39,
  "Bus 8" = 40,
  "Bus 9" = 41,
  "Bus 10" = 42,
  "Bus 11" = 43,
  "Bus 12" = 44,
  "Bus 13" = 45,
  "Bus 14" = 46,
  "Bus 15" = 47,
  "Bus 16" = 48,
  "MX1" = 49,
  "MX2" = 50,
  "MX3" = 51,
  "MX4" = 52,
  "MX5" = 53,
  "MX6" = 54,
  "Master LR" = 55,
  "Master C" = 56,
}

export type FxInsertType = typeof FX_INSERT[keyof typeof FX_INSERT]

// For FX 1-4
// We can get the main mode by
// fx/1/source/l
// /fx/1/source/r

// If set to insert or 5-8 then
// /-insert/fx[1-8]L
// /-insert/fx8L
// /-insert/aux1
// When 1-4 are in insert mode or on a buss line they are 0
// 0 = OFF
// 1-32 = Channels
// 33-48 = Bus 1-16
// 49-54 = MX 1-6
// 55 = Master L/R
// 56 = Master Center

/**
/formatsubscribe
[
  {"type":"s","value":"/custommeters1"},
  {"type": "s", "value": "/-insert/fx8L"},
  {"type": "s", "value": "/-insert/fx8R"},
  {"type" :"i", "value": 0},
  {"type" :"i", "value": 0}, 
  {"type" :"i", "value": 10}
]
 */
