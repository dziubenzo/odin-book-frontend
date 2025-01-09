import { MdOutlineErrorOutline } from 'react-icons/md';
import { StyledError } from '../styles/App.styled';

type ErrorProps = {
  errorMessage: string;
};

function Error({ errorMessage }: ErrorProps) {
  return (
    <StyledError>
      <MdOutlineErrorOutline />
      <h1>There was an error.</h1>
      <h1>Refresh the page to try again.</h1>
      <p>Message: {errorMessage}</p>
    </StyledError>
  );
}

export default Error;
