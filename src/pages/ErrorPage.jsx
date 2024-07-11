import PropTypes from 'prop-types';
import { useRouteError } from 'react-router-dom';
import { StyledErrorPage } from '../styles/ErrorPage.styled';
import Theme from '../components/Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { Link } from 'react-router-dom';
import { useChangeTitle } from '../hooks';

function ErrorPage({ isWholePage = false }) {
  const error = useRouteError();

  useChangeTitle('Error');

  return (
    <Theme>
      <GlobalStyle />
      <StyledErrorPage className={isWholePage ? 'whole-page' : undefined}>
        <h2>{error.status || 500}</h2>
        <h1>{error.message || 'Error'}</h1>
        <Link to={'/posts'}>Back to Main Page</Link>
      </StyledErrorPage>
    </Theme>
  );
}

ErrorPage.propTypes = {
  isWholePage: PropTypes.bool,
};

export default ErrorPage;
