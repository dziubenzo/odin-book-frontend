import Theme from '../components/Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { StyledWelcomePage } from '../styles/WelcomePage.styled';
import { StyledButton } from '../styles/WelcomePage.styled';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import Loading from '../components/Loading';
import { useEffect, useRef, useState } from 'react';
import { useChangeTitle, useCheckAuth } from '../hooks';
import { logInAsGuest } from '../helpers';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const loginModalRef = useRef(null);
  const signupModalRef = useRef(null);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPage, setShowPage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useChangeTitle('Welcome');
  useCheckAuth(setShowPage);

  // Show the loading screen after a delay to prevent an empty page when the server is waking up from sleep
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setShowLoading(true);
    }, 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  async function handleLogInAsGuestClick() {
    await logInAsGuest(setIsLoggingIn, navigate);
  }

  return (
    <Theme>
      <StyledWelcomePage>
        <GlobalStyle />
        {showPage && (
          <>
            <div className="welcome-page-wrapper">
              <h1>
                Welcome to <span className="app-name">AURORA</span>
              </h1>
              <div className="welcome-page-btns">
                <StyledButton onClick={() => loginModalRef.current.showModal()}>
                  Log In
                </StyledButton>
                <StyledButton
                  onClick={() => signupModalRef.current.showModal()}
                >
                  Sign Up
                </StyledButton>
                <StyledButton
                  className="log-in-as-guest-btn"
                  onClick={handleLogInAsGuestClick}
                >
                  {isLoggingIn ? 'Logging In...' : 'Log In As Guest'}
                </StyledButton>
              </div>
            </div>
            <LoginModal
              loginModalRef={loginModalRef}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
            <SignupModal
              signupModalRef={signupModalRef}
              loginModalRef={loginModalRef}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </>
        )}
        {showLoading && !showPage && <Loading />}
      </StyledWelcomePage>
    </Theme>
  );
}

export default WelcomePage;
