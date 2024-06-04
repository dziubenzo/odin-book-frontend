import PropTypes from 'prop-types';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { StyledError } from '../styles/App.styled';

function Error({ errorMessage }) {
  return (
    <StyledError>
      <MdOutlineErrorOutline />
      <h1>There was an error.</h1>
      <h1>Refresh the page to try again.</h1>
      <p>Message: {errorMessage || '?'}</p>
    </StyledError>
  );
}

Error.propTypes = {
  errorMessage: PropTypes.any,
};

export default Error;
