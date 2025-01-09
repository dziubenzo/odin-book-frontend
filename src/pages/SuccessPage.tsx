import { StyledSuccessPage } from '../styles/SuccessPage.styled';
import { GrStatusGood } from 'react-icons/gr';
import { useChangeTitle } from '../hooks';

type SuccessPageProps = {
  resourceCreated: 'post' | 'category';
};

function SuccessPage({ resourceCreated }: SuccessPageProps) {
  useChangeTitle('Success');

  return (
    <StyledSuccessPage>
      <GrStatusGood />
      <p>New {resourceCreated} created successfully!</p>
      <p>Redirecting to the new {resourceCreated} page...</p>
    </StyledSuccessPage>
  );
}

export default SuccessPage;
