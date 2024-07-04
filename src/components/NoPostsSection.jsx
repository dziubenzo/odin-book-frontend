import { StyledNoPostsSection } from '../styles/PostsPage.styled';
import { GiSadCrab } from 'react-icons/gi';

function NoPostsSection() {
  return (
    <StyledNoPostsSection>
      <GiSadCrab className="no-posts-crab" />
      <h1>No Posts Found</h1>
    </StyledNoPostsSection>
  );
}

export default NoPostsSection;
