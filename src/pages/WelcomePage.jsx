import Theme from '../components/Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { StyledWelcomePage } from '../styles/WelcomePage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import { useRef } from 'react';

function WelcomePage() {
  const loginModalRef = useRef(null);
  const signupModalRef = useRef(null);

  return (
    <Theme>
      <StyledWelcomePage>
        <GlobalStyle />
        <div className="welcome-page-wrapper">
          <h1>
            Welcome to <span className="app-name">APP NAME</span>
          </h1>
          <div className="welcome-page-btns">
            <StyledButton onClick={() => loginModalRef.current.showModal()}>
              Log In
            </StyledButton>
            <StyledButton onClick={() => signupModalRef.current.showModal()}>
              Sign Up
            </StyledButton>
          </div>
        </div>
        <LoginModal loginModalRef={loginModalRef} />
        <SignupModal signupModalRef={signupModalRef} />
      </StyledWelcomePage>
    </Theme>
  );
}

export default WelcomePage;
