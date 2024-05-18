import PropTypes from 'prop-types';
import { StyledModal } from '../styles/WelcomePage.styled';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledSubmitButton, StyledInput } from '../styles/WelcomePage.styled';

function LoginModal({ loginModalRef }) {
  function logIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
  }

  return (
    <StyledModal
      ref={loginModalRef}
      onClick={(event) =>
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
          <StyledInput type="text" id="username" name="username" required />
          <label htmlFor="password">Password</label>
          <StyledInput type="password" id="password" name="password" required />
        </form>
        <StyledSubmitButton type="submit" form="login-form">
          Log In
        </StyledSubmitButton>
      </div>
    </StyledModal>
  );
}

LoginModal.propTypes = {
  loginModalRef: PropTypes.any,
};

export default LoginModal;
