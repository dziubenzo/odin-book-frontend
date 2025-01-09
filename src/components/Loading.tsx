import { ClimbingBoxLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { StyledLoading } from '../styles/App.styled';

type LoadingProps = {
  message: string;
  isWholePage: boolean;
};

function Loading({ message, isWholePage = false }: LoadingProps) {
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

export default Loading;
