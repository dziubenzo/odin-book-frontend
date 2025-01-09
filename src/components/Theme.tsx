import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../constants';

type ThemeProps = {
  theme?: string;
  children: ReactNode;
};

export default function Theme({ theme, children }: ThemeProps) {
  if (!theme) {
    theme = localStorage.getItem('theme') || 'dark';
  }
  return (
    <ThemeProvider theme={theme !== 'light' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}
