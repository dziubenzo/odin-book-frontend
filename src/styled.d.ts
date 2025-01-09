import 'styled-components';
import { ThemeObject } from './types';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeObject {}
}
