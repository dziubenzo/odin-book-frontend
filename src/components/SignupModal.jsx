import API_URL from '../API';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyledSignupModal } from '../styles/WelcomePage.styled';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledSubmitButton, StyledInput } from '../styles/WelcomePage.styled';
import { setTimedMessage } from '../helpers';

function SignupModal({
  signupModalRef,
  loginModalRef,
  setUsername,
  setPassword,
}) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState('');

  async function signUp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser = {
      username: formData.get('username'),
      password: formData.get('password'),
      confirm_password: formData.get('confirm_password'),
    };
    setIsSigningUp(true);
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const error = await res.json();
      setIsSigningUp(false);
      return setTimedMessage(error, setError);
    }
    // Show Log In modal and pass Sign Up username and password to Log In modal
    setIsSigningUp(false);
    signupModalRef.current.close();
    loginModalRef.current.showModal();
    setUsername(newUser.username);
    setPassword(newUser.password);
    // Clear Sign Up modal form
    event.target.reset();
    return;
  }

  return (
    <StyledSignupModal
      ref={signupModalRef}
      onMouseDown={(event) =>
        event.target === signupModalRef.current
          ? signupModalRef.current.close()
          : undefined
      }
    >
      <div className="modal-wrapper">
        <button
          className="close-modal-icon"
          aria-label="Close Modal Icon"
          title="Close"
          onClick={() => signupModalRef.current.close()}
        >
          <IoCloseOutline />
        </button>
        <form id="signup-form" method="post" onSubmit={signUp}>
          <label htmlFor="username-signup">Username</label>
          <StyledInput
            type="text"
            id="username-signup"
            name="username"
            minLength={3}
            maxLength={16}
            required
          />
          <label htmlFor="password-signup">Password</label>
          <StyledInput
            type="password"
            id="password-signup"
            name="password"
            minLength={3}
            maxLength={16}
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <StyledInput
            type="password"
            id="confirm-password"
            name="confirm_password"
            minLength={3}
            maxLength={16}
            required
          />
        </form>
        <StyledSubmitButton
          style={error ? { visibility: 'hidden' } : undefined}
          type="submit"
          form="signup-form"
        >
          {isSigningUp ? 'Signing Up...' : 'Sign Up'}
        </StyledSubmitButton>
        {error && <p className="error-message">{error}</p>}
      </div>
    </StyledSignupModal>
  );
}

SignupModal.propTypes = {
  signupModalRef: PropTypes.any,
  loginModalRef: PropTypes.any,
  setUsername: PropTypes.func,
  setPassword: PropTypes.func,
};

export default SignupModal;
