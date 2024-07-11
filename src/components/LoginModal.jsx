import API_URL from '../API';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyledModal } from '../styles/WelcomePage.styled';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledSubmitButton, StyledInput } from '../styles/WelcomePage.styled';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setTimedMessage } from '../helpers';

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
    const formData = new FormData(event.target);
    const user = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
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
      return setTimedMessage(error, setError);
    }
    // Create a cookie with API-signed JWT
    const token = await res.json();
    setIsLoggingIn(false);
    Cookies.set('jwt', token, { expires: 3, secure: true });
    navigate('/posts');
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
        <button
          className="close-modal-icon"
          aria-label="Close Modal Icon"
          title="Close"
          onClick={() => loginModalRef.current.close()}
        >
          <IoCloseOutline />
        </button>
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
