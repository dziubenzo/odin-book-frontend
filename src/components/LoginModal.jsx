import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyledModal } from '../styles/WelcomePage.styled';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledSubmitButton, StyledInput } from '../styles/WelcomePage.styled';
import { useNavigate } from 'react-router-dom';
import API_URL from '../API';
import Cookies from 'js-cookie';

function LoginModal({
  loginModalRef,
  username,
  setUsername,
  password,
  setPassword,
}) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function logIn(event) {
    event.preventDefault();
    const user = { username, password };
    setIsLoggingIn(true);
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      setIsLoggingIn(false);
      setError(error);
      return setTimeout(() => {
        setError('');
      }, 2000);
    }
    // Create a cookie with API-signed JWT
    const token = await res.json();
    setIsLoggingIn(false);
    Cookies.set('jwt', token, { expires: 3, secure: true });
    navigate('/home');
  }

  return (
    <StyledModal
      ref={loginModalRef}
      onMouseDown={(event) =>
        event.target === loginModalRef.current
          ? loginModalRef.current.close()
          : undefined
      }
    >
      <div className="modal-wrapper">
        <IoCloseOutline
          className="close-modal-btn"
          title="Close"
          onClick={() => loginModalRef.current.close()}
        />
        <form id="login-form" method="post" onSubmit={logIn}>
          <label htmlFor="username">Username</label>
          <StyledInput
            type="text"
            id="username"
            name="username"
            minLength={3}
            maxLength={16}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            minLength={3}
            maxLength={16}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </form>
        <StyledSubmitButton
          style={error ? { visibility: 'hidden' } : undefined}
          type="submit"
          form="login-form"
        >
          {isLoggingIn ? 'Logging In...' : 'Log In'}
        </StyledSubmitButton>
        {error && <p className="error-message">{error}</p>}
      </div>
    </StyledModal>
  );
}

LoginModal.propTypes = {
  loginModalRef: PropTypes.any,
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
};

export default LoginModal;
