import { colors } from "@/shared/styles"
import { css } from "styled-components"

export const meterScreenStyles = css`
  display: flex;
  flex-direction: column;

  .meter-row {
    display: flex;
    flex-direction: row;

    .meter-cell {
      width: 90px;
      height: 320px;
      flex-shrink: 0;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.15s;
    }

    .meter-cell.meter-cell-selected {
      background: ${colors.backgroundLight};
    }

    .Reduction-label {
      /* Make the reduction meters the same height as standard meters. */
      margin-top: 130px;
    }
  }
`
