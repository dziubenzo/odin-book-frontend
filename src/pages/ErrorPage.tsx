import { Link, useRouteError } from 'react-router-dom';
import Theme from '../components/Theme';
import { useChangeTitle } from '../hooks';
import { StyledErrorPage } from '../styles/ErrorPage.styled';
import GlobalStyle from '../styles/GlobalStyle';

type ErrorPageProps = {
  isWholePage: boolean;
};

function ErrorPage({ isWholePage = false }: ErrorPageProps) {
  const error = useRouteError();

  useChangeTitle('Error');

  return (
    <Theme>
      <GlobalStyle />
      <StyledErrorPage className={isWholePage ? 'whole-page' : undefined}>
        <h2>500</h2>
        <h1>
          {error instanceof Error ? error.message : 'Something went wrong'}
        </h1>
        <Link to={'/posts'}>Back to Main Page</Link>
      </StyledErrorPage>
    </Theme>
  );
}

export default ErrorPage;
