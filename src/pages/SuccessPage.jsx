import PropTypes from 'prop-types';
import { StyledSuccessPage } from '../styles/SuccessPage.styled';
import { GrStatusGood } from 'react-icons/gr';
import { useChangeTitle } from '../hooks';

function SuccessPage({ resourceCreated }) {
  useChangeTitle('Success');

  return (
    <StyledSuccessPage>
      <GrStatusGood />
      <p>New {resourceCreated} created successfully!</p>
      <p>Redirecting to the new {resourceCreated} page...</p>
    </StyledSuccessPage>
  );
}

SuccessPage.propTypes = {
  resourceCreated: PropTypes.string,
};

export default SuccessPage;
