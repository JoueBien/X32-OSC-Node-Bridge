import { colors } from "@/shared/styles"
import { css } from "styled-components"

export const muteMapperScreenStyles = css`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  /* justify-content: flex-start; */

  padding: 0.6rem;
  padding-top: 0px;

  form {
    width: 200px;
    display: flex;
    flex-direction: column;

    .text {
      line-height: 3rem;
    }

    .SelectPicker {
      min-width: 200px;
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
    flex-grow: 1;
    flex-shrink: 1;

    &.with-full {
      width: 100%;
      .item {
        width: 100%;
      }
    }

    &.with-600 {
      width: 600px;

      .item {
        width: 600px;
      }
    }

    &.with-400 {
      width: 400px;

      .item {
        width: 400px;
      }
    }

    &.with-300 {
      width: 300px;

      .item {
        width: 300px;
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
        /* width: 243px; */
      }

      .label-35p {
        flex-shrink: 1;
        width: 35%;
      }

      .label-40p {
        flex-shrink: 1;
        width: 40%;
      }

      .label-fill {
        flex-shrink: 1;
        flex-grow: 1;
        text-align: left;
        width: 100%;
      }

      .direction {
        width: 32px;
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
