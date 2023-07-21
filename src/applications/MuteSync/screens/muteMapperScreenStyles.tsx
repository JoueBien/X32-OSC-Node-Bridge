import { colors } from "@/shared/styles"
import { css } from "styled-components"

export const muteMapperScreenStyles = css`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: flex-start;

  padding: 0.6rem;
  padding-top: 0px;

  form {
    display: flex;
    flex-direction: column;

    .text {
      line-height: 3rem;
    }

    .SelectPicker {
      min-width: 243px;
    }

    .Button {
      margin-top: 1rem;
    }
  }

  .separator {
    width: 100%;
  }

  .list {
    margin-left: 1rem;

    &.with-600 {
      width: 600px;

      .item {
        width: 100%;
      }
    }

    .item {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;

      min-height: 2.5rem;

      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid ${colors.text};

      & + .item {
        /* margin-top: 1rem; */
      }

      .label {
        text-align: left;
        width: 243px;
      }

      .label-fill {
        text-align: left;
        width: 100%;
      }

      .direction {
        width: 3rem;
      }
      .remove {
        flex-shrink: 0;
        button {
          margin-left: 0.5rem;
        }
      }
    }
  }
`
