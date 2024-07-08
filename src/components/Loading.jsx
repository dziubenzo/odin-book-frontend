import PropTypes from 'prop-types';
import { StyledLoading } from '../styles/App.styled';
import { ClimbingBoxLoader } from 'react-spinners';

function Loading({ message, isWholePage = false }) {
  return (
    <StyledLoading className={isWholePage ? 'whole-page' : undefined}>
      <ClimbingBoxLoader size="24px" color="#F97300" />
      {!message ? <h1>Loading...</h1> : <h1>Loading {message}...</h1>}
    </StyledLoading>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  isWholePage: PropTypes.bool,
};

export default Loading;
