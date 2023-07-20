// Libs
import { css } from "styled-components"

// Comps
import { colors } from "shared/styles"

// Styles
export const connectionScreenStyles = css`
  /* --rs-border-primary: ${colors.background}; */
  display: flex;
  width: 700px;

  &.full-screen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${colors.inverted.background};
    color: ${colors.inverted.text};
    padding: 15px;
    border-radius: 5px;
  }

  /* &.white-bg {
    background: ${colors.inverted.background};
    color: ${colors.inverted.text};
    padding: 15px;
    border-radius: 5px;
  } */

  h1 {
    margin: unset;
    line-height: 1rem;
    font-size: 0.85rem;
  }

  .form {
    flex: 2;
  }
  /*
    .form-item {
      max-width: 400px;
    }

    .form-item + .form-item {
      margin-top: 15px;
    }

    button + button {
      margin-left: 15px;
    }

    .error {
      height: 1em;
      color: red;
    }
  } */

  /* .recall {
    flex: 1;
    height: 400px;
    overflow: auto;
    padding-left: 15px;

    h1 {
      position: sticky;
      top: 0px;
      left: 0px;
    }

    .ip-address {
      margin-top: 10px;

      button + button {
        margin-left: 10px;
      }
    }
  } */
`
