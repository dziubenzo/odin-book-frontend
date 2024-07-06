import { useRouteError } from 'react-router-dom';
import { StyledErrorPage } from '../styles/ErrorPage.styled';
import Theme from '../components/Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { Link } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.log(error)

  return (
    <Theme>
      <GlobalStyle />
      <StyledErrorPage>
        <h2>{error.status || 500}</h2>
        <h1>{error.message || 'Error'}</h1>
        <Link to={'/posts'}>Back to Main Page</Link>
      </StyledErrorPage>
    </Theme>
  );
}

export default ErrorPage;
