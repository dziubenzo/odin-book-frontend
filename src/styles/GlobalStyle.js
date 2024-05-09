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
      border: none;
      outline: 2px solid ${(props) => props.theme.colours.secondary};
    }
  }

  #root {
    background: ${(props) => props.theme.colours.backgroundGradient};
    padding: 0 1em;
  }
`;

export default GlobalStyle;
