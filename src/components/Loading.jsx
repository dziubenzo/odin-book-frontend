import PropTypes from 'prop-types';
import { StyledLoading } from '../styles/App.styled';
import { ClimbingBoxLoader } from 'react-spinners';

function Loading({ message }) {
  return (
    <StyledLoading>
      <ClimbingBoxLoader size="24px" color="#F97300" />
      {!message ? <h1>Loading...</h1> : <h1>Loading {message}...</h1>}
    </StyledLoading>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
