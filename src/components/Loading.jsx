import PropTypes from 'prop-types';
import { StyledLoading } from '../styles/App.styled';
import { ClimbingBoxLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

function Loading({ message, isWholePage = false }) {
  const theme = useTheme();

  return (
    <StyledLoading className={isWholePage ? 'whole-page' : undefined}>
      <ClimbingBoxLoader
        size="24px"
        color={theme.colours.primary || undefined}
      />
      {!message ? <h1>Loading...</h1> : <h1>Loading {message}...</h1>}
    </StyledLoading>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  isWholePage: PropTypes.bool,
};

export default Loading;
