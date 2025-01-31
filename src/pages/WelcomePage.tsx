import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import Theme from '../components/Theme';
import { THEME_INITIAL_VALUE } from '../constants';
import { getThemeFromLocalStorage, logInAsGuest } from '../helpers';
import { useChangeTitle, useCheckAuth } from '../hooks';
import GlobalStyle from '../styles/GlobalStyle';
import { StyledButton, StyledWelcomePage } from '../styles/WelcomePage.styled';

function WelcomePage() {
  const loginModalRef = useRef<HTMLDialogElement>(null);
  const signupModalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const theme = getThemeFromLocalStorage(THEME_INITIAL_VALUE);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [logInAutomatically, setLogInAutomatically] = useState(false);

  useChangeTitle('Welcome');
  const showPage = useCheckAuth();

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

  function showModal(modalRef: React.RefObject<HTMLDialogElement | null>) {
    if (!modalRef.current) return;
    modalRef.current.showModal();
  }

  return (
    <Theme theme={theme}>
      <StyledWelcomePage>
        <GlobalStyle />
        {showPage && (
          <>
            <div className="welcome-page-wrapper">
              <h1>
                Welcome to <span className="app-name">AURORA</span>
              </h1>
              <div className="welcome-page-btns">
                <StyledButton onClick={() => showModal(loginModalRef)}>
                  Log In
                </StyledButton>
                <StyledButton onClick={() => showModal(signupModalRef)}>
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
              logInAutomatically={logInAutomatically}
            />
            <SignupModal
              signupModalRef={signupModalRef}
              loginModalRef={loginModalRef}
              setUsername={setUsername}
              setPassword={setPassword}
              setLogInAutomatically={setLogInAutomatically}
            />
          </>
        )}
        {showLoading && !showPage && <Loading message={'The App'} />}
      </StyledWelcomePage>
    </Theme>
  );
}

export default WelcomePage;
