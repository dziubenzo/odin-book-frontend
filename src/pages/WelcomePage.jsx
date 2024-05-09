import Theme from '../components/Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { StyledWelcomePage } from '../styles/WelcomePage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';

function WelcomePage() {
  return (
    <Theme>
      <StyledWelcomePage>
        <GlobalStyle />
        <div className="welcome-page-wrapper">
          <h1>
            Welcome to <span className="app-name">APP NAME</span>
          </h1>
          <div className="welcome-page-buttons">
            <StyledButton>Log In</StyledButton>
            <StyledButton>Sign Up</StyledButton>
          </div>
        </div>
      </StyledWelcomePage>
    </Theme>
  );
}

export default WelcomePage;
