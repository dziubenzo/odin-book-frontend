import { createGlobalStyle } from 'styled-components';

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
  }

  body {
    display: flex;
    justify-content: center;
    background: ${(props) => props.theme.colours.backgroundGradient};
    background-attachment: fixed;
  }

  #root {
    display: grid;
    grid-template-rows: min-content auto min-content;
    place-items: center;
    min-height: 100svh;
    width: 100%;
    max-width: 1000px;
    padding: 0 1em;
    background: inherit;

    @media (max-width: ${(props) => props.theme.mobile}) {
      padding: 0 1em;
    }
  }
`;

export default GlobalStyle;
