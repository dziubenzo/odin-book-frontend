import PropTypes from 'prop-types';
import API_URL from '../API';
import { useOutletContext, useParams } from 'react-router-dom';
import { StyledCategoryDetails } from '../styles/PostsPage.styled';
import { useFetchPageData } from '../hooks';
import { useRef, useState } from 'react';
import FollowCategoryButton from './FollowCategoryButton';
import CategoryStats from './CategoryStats';
import { followOrUnfollowCategory } from '../helpers';
import { MdOutlineErrorOutline } from 'react-icons/md';
import CategoryDetailsTop from './CategoryDetailsTop';

function CategoryDetails({ loadingPosts }) {
  const [user, setUser] = useOutletContext();
  const { slug } = useParams();
  const { data: category, setData: setCategory } = useFetchPageData(
    `${API_URL}/categories/${slug}`,
  );
  const errorMessageRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);

  async function handleCategoryButtonClick(categoryID) {
    await followOrUnfollowCategory(
      inProgress,
      user,
      categoryID,
      setInProgress,
      setErrorMessage,
      setUser,
    );
    // Scroll to the error message if there was an error and clear the error message after a timeout
    if (errorMessage) {
      errorMessageRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    if (inProgress) {
      return;
    }
    // Update category followers
    setCategory((draft) => {
      if (user.followed_categories.includes(categoryID)) {
        draft.followersCount--;
        return;
      }
      draft.followersCount++;
    });
  }

  if (category && !loadingPosts) {
    const { description } = category;

    return (
      <StyledCategoryDetails>
        <CategoryDetailsTop category={category} />
        <p className="description">{description}</p>
        {errorMessage && (
          <div className="error-message-wrapper">
            <MdOutlineErrorOutline />
            <p ref={errorMessageRef}>{errorMessage}</p>
          </div>
        )}
        <CategoryStats category={category} />
        <div className="mystery-wrapper">
          <FollowCategoryButton
            loggedInUser={user}
            category={category}
            inProgress={inProgress}
            handleCategoryButtonClick={handleCategoryButtonClick}
          />
        </div>
      </StyledCategoryDetails>
    );
  }
}

CategoryDetails.propTypes = {
  loadingPosts: PropTypes.bool,
};

export default CategoryDetails;
