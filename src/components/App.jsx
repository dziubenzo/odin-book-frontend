import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useAuthUser } from '../hooks';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';

function App({ children }) {
  const [user, setUser] = useAuthUser();
  
  return (
    <Theme>
      <GlobalStyle />
      {user && (
        <>
          <Header />
          <Outlet context={[user, setUser]} />
          <Footer />
        </>
      )}
      {children}
    </Theme>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
