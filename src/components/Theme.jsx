import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const darkTheme = {
  colours: {
    background: '#042426',
    backgroundGradient:
      'linear-gradient(9deg, rgba(4,36,38,1) 51%, rgba(249,115,0,1) 100%)',
    primary: '#F97300',
    secondary: '#E2DFD0',
    tertiary: '#524C42',
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

export default function Theme({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}

Theme.propTypes = {
  children: PropTypes.node,
};
