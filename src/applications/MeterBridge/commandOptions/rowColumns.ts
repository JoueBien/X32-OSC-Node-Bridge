import { CommandOption } from "@/shared/commandOptions/types"

export type Row =
  | [0]
  | [0, 1]
  | [0, 1, 2]
  | [0, 1, 2, 3]
  | [0, 1, 2, 3, 4]
  | [0, 1, 2, 3, 4, 5]
  | [0, 1, 2, 3, 4, 5, 6]
  | [0, 1, 2, 3, 4, 5, 6, 7]

export type Column =
  | [8]
  | [8, 16]
  | [8, 16, 24]
  | [8, 16, 24, 32]
  | [8, 16, 24, 32, 48]
  | [8, 16, 24, 32, 48, 64]
  | [8, 16, 24, 32, 48, 64, 80]
  | [8, 16, 24, 32, 48, 64, 80, 96]

export const RowItems: CommandOption<Row>[] = [
  {
    label: `One Row`,
    value: [0],
  },
  {
    label: `Two Rows`,
    value: [0, 1],
  },
  {
    label: `Three Rows`,
    value: [0, 1, 2],
  },
  {
    label: `Four Rows`,
    value: [0, 1, 2, 3],
  },
  {
    label: `Five Rows`,
    value: [0, 1, 2, 3, 4],
  },
  {
    label: `Six Rows`,
    value: [0, 1, 2, 3, 4, 5],
  },
  {
    label: `Seven Rows`,
    value: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    label: `Eight Rows`,
    value: [0, 1, 2, 3, 4, 5, 6, 7],
  },
]

export const ColumnItems: CommandOption<Column>[] = [
  {
    label: `Eight Columns per Row`,
    value: [8],
  },
  {
    label: `Sixteen Columns per Row`,
    value: [8, 16],
  },
  {
    label: `Twenty Four Columns per Row`,
    value: [8, 16, 24],
  },
  {
    label: `Thirty Two Columns per Row`,
    value: [8, 16, 24, 32],
  },
  {
    label: `Forty Eight Columns per Row`,
    value: [8, 16, 24, 32, 48],
  },
  {
    label: `Sixty Four Columns per Row`,
    value: [8, 16, 24, 32, 48, 64],
  },
  {
    label: `Eighty Columns per Row`,
    value: [8, 16, 24, 32, 48, 64, 80],
  },
  {
    label: `Nighty Six Columns per Row`,
    value: [8, 16, 24, 32, 48, 64, 80, 96],
  },
]
