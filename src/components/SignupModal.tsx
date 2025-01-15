import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import API_URL from '../API';
import { setTimedMessage } from '../helpers';
import {
  StyledInput,
  StyledSignupModal,
  StyledSubmitButton,
} from '../styles/WelcomePage.styled';

type SignupModalProps = {
  signupModalRef: React.RefObject<HTMLDialogElement | null>;
  loginModalRef: React.RefObject<HTMLDialogElement | null>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

function SignupModal({
  signupModalRef,
  loginModalRef,
  setUsername,
  setPassword,
}: SignupModalProps) {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState('');

  async function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    if (!username || !password) return;
    const newUser = {
      username,
      password,
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
    closeModal();
    showLoginModal();
    setUsername(username);
    setPassword(password);
    // Clear Sign Up modal form
    (event.target as HTMLFormElement).reset();
    return;
  }

  function closeModal() {
    if (!signupModalRef.current) return;
    signupModalRef.current.close();
  }

  function closeModalOnOutsideClick(
    event: React.MouseEvent<HTMLDialogElement>,
  ) {
    return event.target === signupModalRef.current ? closeModal() : undefined;
  }

  function showLoginModal() {
    if (!loginModalRef.current) return;
    loginModalRef.current.showModal();
  }

  return (
    <StyledSignupModal
      ref={signupModalRef}
      onMouseDown={closeModalOnOutsideClick}
    >
      <div className="modal-wrapper">
        <button
          className="close-modal-icon"
          aria-label="Close Modal Icon"
          title="Close"
          onClick={closeModal}
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

export default SignupModal;
