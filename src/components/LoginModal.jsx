import PropTypes from 'prop-types';
import { StyledModal } from '../styles/WelcomePage.styled';
import { IoCloseOutline } from 'react-icons/io5';
import { StyledSubmitButton, StyledInput } from '../styles/WelcomePage.styled';

function LoginModal({
  loginModalRef,
  username,
  setUsername,
  password,
  setPassword,
}) {
  function logIn(event) {
    event.preventDefault();
    const user = { username, password };
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
          <StyledInput
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target)}
            required
          />
          <label htmlFor="password">Password</label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target)}
            required
          />
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
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func,
};

export default LoginModal;
