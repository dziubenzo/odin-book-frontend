import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { THEME_INITIAL_VALUE } from '../constants';
import { useAuthUser, useSmoothScrollToTop, useThemeValue } from '../hooks';
import GlobalStyle from '../styles/GlobalStyle';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import Theme from './Theme';

type AppProps = {
  children?: ReactNode;
};

function App({ children }: AppProps) {
  const { theme, setTheme } = useThemeValue(THEME_INITIAL_VALUE);
  const { user, setUser } = useAuthUser();
  useSmoothScrollToTop();

  return (
    <Theme theme={theme}>
      <GlobalStyle />
      {!user && <Loading message={'The App'} isWholePage={true} />}
      {user && (
        <>
          <Header />
          <Outlet context={{ user, setUser, theme, setTheme }} />
          {children}
          <Footer user={user} theme={theme} setTheme={setTheme} />
        </>
      )}
    </Theme>
  );
}

export default App;
