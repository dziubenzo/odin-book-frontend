import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../constants';
import type { ThemeValue } from '../types';

type ThemeProps = {
  theme?: ThemeValue;
  children: ReactNode;
};

export default function Theme({ theme = 'dark', children }: ThemeProps) {
  return (
    <ThemeProvider theme={theme !== 'light' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}
