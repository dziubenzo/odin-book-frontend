import PropTypes from 'prop-types';
import { StyledSignupModal } from '../styles/WelcomePage.styled';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledSubmitButton, StyledInput } from '../styles/WelcomePage.styled';

function SignupModal({ signupModalRef }) {
  function signUp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');
  }

  return (
    <StyledSignupModal
      ref={signupModalRef}
      onClick={(event) =>
        event.target === signupModalRef.current
          ? signupModalRef.current.close()
          : undefined
      }
    >
      <div className="modal-wrapper">
        <IoCloseOutline
          className="close-modal-btn"
          title="Close"
          onClick={() => signupModalRef.current.close()}
        />
        <form id="signup-form" method="post" onSubmit={signUp}>
          <label htmlFor="username-signup">Username</label>
          <StyledInput
            type="text"
            id="username-signup"
            name="username"
            required
          />
          <label htmlFor="password-signup">Password</label>
          <StyledInput
            type="password"
            id="password-signup"
            name="password"
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <StyledInput
            type="password"
            id="confirm-password"
            name="confirm_password"
            required
          />
        </form>
        <StyledSubmitButton type="submit" form="signup-form">
          Sign Up
        </StyledSubmitButton>
      </div>
    </StyledSignupModal>
  );
}

SignupModal.propTypes = {
  signupModalRef: PropTypes.any,
};

export default SignupModal;
