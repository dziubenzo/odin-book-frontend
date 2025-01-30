import type { ThemeValue } from './types';

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
    red: '#f84242',
    gitHubLogo: 'white',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
    popoverBoxShadow:
      'rgba(161, 161, 161, 0.05) 0px 6px 24px 0px, rgba(185, 185, 185, 0.08) 0px 0px 0px 1px;',
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
  tabletMin: '769px',
  tabletMax: '1024px',
};

export const lightTheme = {
  ...darkTheme,
  colours: {
    background: '#d0b8ac',
    backgroundGradient: 'linear-gradient(9deg, #d0b8ac 51%, #ffba49 100%)',
    primary: '#373A40',
    primaryLighter: '#656565',
    primaryDarker: '#1c1e21',
    secondary: '#373A40',
    tertiary: '#f3d8c7',
    red: '#ac2020',
    gitHubLogo: 'black',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px;',
    popoverBoxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  },
};

export const MIN_COMMENT_LENGTH = 3;
export const MAX_COMMENT_LENGTH = 320;
export const MAX_BIO_LENGTH = 320;
export const MIN_CATEGORY_NAME_LENGTH = 3;
export const MAX_CATEGORY_NAME_LENGTH = 32;
export const MIN_CATEGORY_DESCRIPTION_LENGTH = 3;
export const MAX_CATEGORY_DESCRIPTION_LENGTH = 320;
export const MIN_POST_TITLE_LENGTH = 3;
export const MAX_POST_TITLE_LENGTH = 64;
export const MIN_POST_CONTENT_LENGTH = 8;
export const POSTS_PER_FETCH = 15;
export const SHRINK_HEADER_SCROLL_VALUE = 100;
export const POPOVER_SHOW_DELAY = 500;

export const defaultAvatars = [
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/b0heqsns8cpkyjzm1bsd.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/dfmwqquwvyavf4v31wcg.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/kqrc0rjjpz18d0rz0lhw.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/cpwima9dqagdfywemsop.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/mxppgtj6ahub99iimrii.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/d8lormu9xhhiyendqm0v.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111759/odin_book/avatars/default/kvvaddcwsv0at8xdkunu.png',
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1718111758/odin_book/avatars/default/akap5kaki53sgmkhqekz.png',
];

export const defaultCategoryIcon =
  'https://res.cloudinary.com/dvhkp9wc6/image/upload/v1719224975/odin_book/category_icons/default/yx1nunw6khsgatgbqczt.png';

export const allowedImageFormats = [
  'image/avif',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const THEME_INITIAL_VALUE: ThemeValue = 'dark';
