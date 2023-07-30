import { colors } from "@/shared/styles"
import { css } from "styled-components"

export const screenStyles = css`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;

  .flyout {
    width: 320px;
    display: flex;

    flex-direction: column;
    justify-content: flex-start;

    padding: 0.6rem;
    padding-top: 0px;
    border-right: 1px solid ${colors.inverted.background};

    .connect-controls {
      & + .connect-controls {
        margin-top: 0.3rem;
      }
    }

    .connect-group {
      padding: 0.3rem;
      border-radius: 0.3rem;
      border: 1px solid ${colors.inverted.background};

      & + .connect-group {
        margin-top: 0.3rem;
      }

      p {
        margin-bottom: 0.3rem;
      }

      button + button {
        margin-left: 0.3rem;
      }

      button.width-full {
        margin-left: 0px;
        margin-top: 0.3rem;
      }
    }
  }

  .work {
    position: absolute;
    top: 0px;
    left: 320px;
    right: 0px;
    bottom: 0px;
    /* width: 100%; */
    display: flex;
    flex-direction: column;

    padding: 0.6rem;
    padding-top: 0px;
    margin-top: 0.6rem;

    overflow: auto;

    .nav-container-sticky {
      width: 100%;
      position: sticky;
      top: 0px;
      background: ${colors.background};
      /* Overflow is bugged with nav stack? */
    }

    .in-out {
      width: 100%;
      display: flex;
      justify-content: space-between;

      margin-top: 0.6rem;

      .in-out-item {
        width: calc((100% / 2) - 0.6rem);

        textarea {
          min-height: calc((100vh - 10.6rem) / 2);
        }
      }
    }
  }
`
