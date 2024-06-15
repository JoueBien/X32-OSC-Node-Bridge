import { CommandOption } from "@/shared/commandOptions/types"
import {
  Row,
  Column,
  RowItems,
  ColumnItems,
} from "../../commandOptions/rowColumns"
import { useLocalStorage } from "usehooks-ts"

export function useRowColumns() {
  // Local State
  // Default to 2 by 16
  const [rows, setRows] = useLocalStorage<CommandOption<Row>>(
    "meter-bridge-set-up-rows",
    RowItems[1]
  )
  const [columns, setColumns] = useLocalStorage<CommandOption<Column>>(
    "meter-bridge-set-up-columns",
    ColumnItems[1]
  )

  // Functions
  // Do a set of both.
  const recallRowColumns = (params: {
    rows: CommandOption<Row>
    columns: CommandOption<Column>
  }) => {
    setRows(params.rows)
    setColumns(params.columns)
  }

  const reSetRowColumns = () => {
    recallRowColumns({ rows: RowItems[1], columns: ColumnItems[1] })
  }

  return {
    // State
    rows,
    columns,
    // Mutators
    recallRowColumns,
    reSetRowColumns,
    setRows,
    setColumns,
  }
}

export type UseRowColumns = ReturnType<typeof useRowColumns>
