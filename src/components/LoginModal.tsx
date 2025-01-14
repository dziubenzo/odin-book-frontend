import Cookies from 'js-cookie';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import API_URL from '../API';
import { setTimedMessage } from '../helpers';
import {
  StyledInput,
  StyledModal,
  StyledSubmitButton,
} from '../styles/WelcomePage.styled';

type LoginModalProps = {
  loginModalRef: React.RefObject<HTMLDialogElement>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

function LoginModal({
  loginModalRef,
  username,
  setUsername,
  password,
  setPassword,
}: LoginModalProps) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function logIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
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

  function closeModal() {
    if (!loginModalRef.current) return;
    loginModalRef.current.close();
  }

  function closeModalOnOutsideClick(
    event: React.MouseEvent<HTMLDialogElement>,
  ) {
    return event.target === loginModalRef.current ? closeModal() : undefined;
  }

  return (
    <StyledModal ref={loginModalRef} onMouseDown={closeModalOnOutsideClick}>
      <div className="modal-wrapper">
        <button
          className="close-modal-icon"
          aria-label="Close Modal Icon"
          title="Close"
          onClick={closeModal}
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
            defaultValue={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            minLength={3}
            maxLength={16}
            defaultValue={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
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

export default LoginModal;
