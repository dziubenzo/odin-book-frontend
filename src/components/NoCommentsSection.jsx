import { StyledNoCommentsSection } from '../styles/PostDetailsPage.styled';
import { GiPodiumWinner } from 'react-icons/gi';

function NoCommentsSection() {
  return (
    <StyledNoCommentsSection>
      <GiPodiumWinner />
      <p>Be The First To Comment!</p>
    </StyledNoCommentsSection>
  );
}

export default NoCommentsSection;
