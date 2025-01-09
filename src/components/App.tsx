import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthUser, useThemeValue } from '../hooks';
import GlobalStyle from '../styles/GlobalStyle';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import Theme from './Theme';

type AppProps = {
  children?: ReactNode;
};

function App({ children }: AppProps) {
  const [theme, setTheme] = useState('');

  const { user, setUser } = useAuthUser();
  useThemeValue(setTheme);

  return (
    <Theme theme={theme} setTheme={setTheme}>
      <GlobalStyle />
      {!user && <Loading message={'The App'} isWholePage={true} />}
      {user && (
        <>
          <Header />
          <Outlet context={{ user, setUser, theme, setTheme }} />
          {children}
          <Footer user={user} />
        </>
      )}
    </Theme>
  );
}

export default App;
