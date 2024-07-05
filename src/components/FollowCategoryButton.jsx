import PropTypes from 'prop-types';
import { StyledButton } from '../styles/WelcomePage.styled';

function FollowCategoryButton({
  loggedInUser,
  category,
  inProgress,
  handleCategoryButtonClick,
}) {
  const { followed_categories } = loggedInUser;
  const { _id: categoryID } = category;

  return (
    <StyledButton
      className="follow-button"
      onClick={() => handleCategoryButtonClick(categoryID)}
    >
      {inProgress === categoryID
        ? 'Changing...'
        : followed_categories.includes(categoryID)
          ? 'Unfollow'
          : 'Follow'}
    </StyledButton>
  );
}

FollowCategoryButton.propTypes = {
  loggedInUser: PropTypes.object,
  category: PropTypes.object,
  inProgress: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  handleCategoryButtonClick: PropTypes.func,
};

export default FollowCategoryButton;
