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
  tabletMin: '769px',
  tabletMax: '1024px',
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
