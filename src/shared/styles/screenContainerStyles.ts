import { css } from "styled-components"
import { colors } from "@/shared/styles"

export const screenContainerStyles = css`
  &.fill-screen {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
  }

  @keyframes led-blink {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.75;
    }

    100% {
      opacity: 1;
    }
  }

  width: 100%;

  /* min-width: 1900px;
  width: 100%; */

  .topNav {
    margin-bottom: 15px;
    .rs-nav-item {
      font-size: 10px;
      padding: 5px;
    }

    .rs-nav-item:not(.rs-nav-item-active) {
      color: grey;
    }

    /* .rs-nav-subtle .rs-nav-item:hover, .rs-nav-subtle .rs-nav-item:focus */

    .rs-nav-item.rs-nav-item-active {
      color: white;
    }

    .rs-nav-bar {
      display: none;
    }
  }

  .rs-btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    border-radius: 0.3rem;
    line-height: 200%;
    font-size: 0.6rem;
    font-weight: 650;
    letter-spacing: 0.025rem;
    text-transform: uppercase;
    flex-shrink: 0;

    &.width-full {
      width: 100%;
    }

    .led {
      width: 10px;
      height: 1rem;
      margin-left: 5px;
      border: 1px solid ${colors.inverted.buttonGrey};
      border-radius: 0.15rem;

      background-color: ${colors.inverted.text};

      &.green {
        background-color: #4dff88;
        animation-name: led-blink;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
      &.yellow {
        background-color: #ffff4d;
        animation-name: led-blink;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
    }
  }

  .Button-grey.rs-btn-default {
    background-color: ${colors.buttonGrey};
    color: ${colors.inverted.buttonGrey};
    border: 1px solid ${colors.buttonGrey};
  }

  .Button-red.rs-btn-default {
    background-color: ${colors.buttonRed};
    color: ${colors.inverted.buttonRed};
    border: 1px solid ${colors.buttonRed};
  }

  .Button-blue.rs-btn-default {
    background-color: ${colors.buttonBlue};
    color: ${colors.inverted.buttonBlue};
    border: 1px solid ${colors.buttonBlue};
  }

  .Button-green {
    background-color: ${colors.buttonGreen};
    color: ${colors.inverted.buttonGreen};
    border: 1px solid ${colors.buttonGreen};
  }

  .rs-input {
    padding: 0.3rem;
    border-radius: 0.3rem;
    line-height: 200%;
    font-size: 0.6rem;
    font-weight: 650;
    letter-spacing: 0.025rem;
    background-color: transparent;
    color: ${colors.text};
  }
`
