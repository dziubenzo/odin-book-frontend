import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

export const darkTheme = {
  colours: {
    background: '#042426',
    backgroundGradient:
      'linear-gradient(9deg, rgba(4,36,38,1) 51%, rgba(249,115,0,1) 100%)',
    primary: '#F97300',
    primaryLighter: '#ffa352',
    primaryDarker: '#d46300',
    secondary: '#E2DFD0',
    tertiary: '#524C42',
    lightRed: '#f84242',
    gitHubLogo: 'white',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
  },
  fontSizes: {
    small: '0.8rem',
    standard: '1.0rem',
    medium: '1.2rem',
    large: '1.5rem',
    extraLarge: '2rem',
  },
  fonts: {
    primary: 'Sen, sans-serif',
  },
  mobile: '768px',
};

export const lightTheme = {
  ...darkTheme,
  colours: {
    background: '#EEEEEE',
    backgroundGradient: 'linear-gradient(9deg, #EEEEEE 51%, #686D76 100%)',
    primary: '#686D76',
    primaryLighter: '#a0a6b2',
    primaryDarker: '#645d5d',
    secondary: '#373A40',
    tertiary: '#b7b7b7',
    lightRed: '#f84242',
    gitHubLogo: 'black',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
  },
};

export default function Theme({ theme, children }) {
  if (!theme) {
    theme = localStorage.getItem('theme') || 'dark';
  }
  return (
    <ThemeProvider theme={theme !== 'light' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}

Theme.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func,
  children: PropTypes.node,
};
