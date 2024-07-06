import PropTypes from 'prop-types';
import { StyledNoPostsSection } from '../styles/PostsPage.styled';
import { GiSadCrab } from 'react-icons/gi';

function NoPostsSection({ isCategoryPage, isUserPage }) {
  return (
    <StyledNoPostsSection
      className={isCategoryPage || isUserPage ? 'position-normal' : undefined}
    >
      <GiSadCrab className="no-posts-crab" />
      <h1>No Posts Found</h1>
    </StyledNoPostsSection>
  );
}

NoPostsSection.propTypes = {
  isCategoryPage: PropTypes.bool,
  isUserPage: PropTypes.bool,
};

export default NoPostsSection;
