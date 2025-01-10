import { GiSadCrab } from 'react-icons/gi';
import { StyledNoPostsSection } from '../styles/PostsPage.styled';

type NoPostsSectionProps = {
  isCategoryPage?: boolean;
  isUserPage?: boolean;
};

function NoPostsSection({ isCategoryPage, isUserPage }: NoPostsSectionProps) {
  return (
    <StyledNoPostsSection
      className={isCategoryPage || isUserPage ? 'position-normal' : undefined}
    >
      <GiSadCrab className="no-posts-crab" />
      <h1>No Posts Found</h1>
    </StyledNoPostsSection>
  );
}

export default NoPostsSection;
