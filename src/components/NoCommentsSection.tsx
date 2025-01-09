import { GiPodiumWinner } from 'react-icons/gi';
import { StyledNoCommentsSection } from '../styles/PostDetailsPage.styled';

function NoCommentsSection() {
  return (
    <StyledNoCommentsSection>
      <GiPodiumWinner />
      <p>Be The First To Comment!</p>
    </StyledNoCommentsSection>
  );
}

export default NoCommentsSection;
