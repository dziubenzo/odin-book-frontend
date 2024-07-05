import PropTypes from 'prop-types';
import { StyledCategory } from '../styles/AllCategoriesPage.styled';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import CategoryBody from './CategoryBody';
import FollowCategoryButton from './FollowCategoryButton';

function Category({ user, category, handleCategoryButtonClick, inProgress }) {
  const { slug } = category;

  return (
    <StyledCategory>
      <Link to={`/categories/${slug}`}>
        <Avatar object={category} size={50} isCategory={true} />
      </Link>
      <CategoryBody category={category} />
      <FollowCategoryButton
        loggedInUser={user}
        category={category}
        inProgress={inProgress}
        handleCategoryButtonClick={handleCategoryButtonClick}
      />
    </StyledCategory>
  );
}

Category.propTypes = {
  user: PropTypes.object,
  category: PropTypes.object,
  handleCategoryButtonClick: PropTypes.func,
  inProgress: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Category;
