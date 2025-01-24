import { createGlobalStyle } from 'styled-components';
import { flicker } from './animations';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${(props) => props.theme.colours.primary};
    font-family: ${(props) => props.theme.fonts.primary};
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;

    &:focus-visible {
      outline: none;
      border: 2px solid ${(props) => props.theme.colours.secondary};
    }

    // Use different scrollbar-related properties depending on browser support
    @supports (scrollbar-width: auto) {
      scrollbar-color: ${(props) => props.theme.colours.primary} ${(props) => props.theme.colours.background};
      scrollbar-width: thin;
    }

    @supports selector(::-webkit-scrollbar) {
      &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colours.primary}
    }

    &::-webkit-scrollbar-track {
        background: ${(props) => props.theme.colours.background}
    }
    }
  }

  body {
    display: flex;
    justify-content: center;
    background: ${(props) => props.theme.colours.backgroundGradient};
    background-attachment: fixed;
    overflow-y: scroll;
  }

  #root {
    display: grid;
    grid-template-rows: min-content auto min-content;
    place-items: center;
    min-height: 100lvh;
    width: 100%;
    max-width: 1000px;
    background: inherit;

      header,
      footer {
        padding: 0.5em 1em;
      }

      main {
        padding: 2em 1em;
      }
  }

  // Helper classes for skeletons
  .skeleton,
  .checkbox-skeleton {
    background-color: ${(props) => props.theme.colours.primary} !important;
    color: transparent !important;
    user-select: none !important;
    cursor: revert !important;
    border-radius: 8px;
    animation: ${flicker} 1s linear infinite alternate;
    pointer-events: none;
  }

  .checkbox-skeleton {
    width: 24px;
    height: 24px;
  }

  .no-hover {
    pointer-events: none;
  }

  .inline {
    display: inline;
  }

  .fit-content {
    min-width: fit-content !important;
    width: fit-content !important;
    max-width: fit-content !important;
  }

  .align-center {
    align-self: center;
  }

  .justify-center {
    justify-self: center;
  }
  
`;

export default GlobalStyle;
