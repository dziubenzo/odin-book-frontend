import PropTypes from 'prop-types';
import { StyledCategory } from '../styles/AllCategoriesPage.styled';
import Avatar from './Avatar';
import { StyledButton } from '../styles/WelcomePage.styled';
import { Link } from 'react-router-dom';
import CategoryBody from './CategoryBody';

function Category({ user, category, handleCategoryButtonClick, inProgress }) {
  const { followed_categories } = user;
  const { _id, slug } = category;

  return (
    <StyledCategory>
      <Link to={`/categories/${slug}`}>
        <Avatar object={category} size={50} isCategory={true} />
      </Link>
      <CategoryBody category={category} />
      <StyledButton
        className="follow-button"
        onClick={() => handleCategoryButtonClick(_id)}
      >
        {inProgress === _id
          ? 'Changing...'
          : followed_categories.includes(_id)
            ? 'Unfollow'
            : 'Follow'}
      </StyledButton>
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
