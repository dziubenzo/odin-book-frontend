import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import { useAuthUser, useThemeValue } from '../hooks';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { useState } from 'react';

function App({ children }) {
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

App.propTypes = {
  children: PropTypes.node,
};

export default App;
