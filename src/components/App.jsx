import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import { useAuthUser } from '../hooks';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';

function App({ children }) {
  const [user, setUser] = useAuthUser();

  return (
    <Theme>
      <GlobalStyle />
      {!user && <Loading isWholePage={true} />}
      {user && (
        <>
          <Header />
          <Outlet context={[user, setUser]} />
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
