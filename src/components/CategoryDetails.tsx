import { useRef, useState } from 'react';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import API_URL from '../API';
import { followOrUnfollowCategory } from '../helpers';
import { useFetchPageData, useSyncWithParent, useUserAndTheme } from '../hooks';
import { StyledResourceDetails } from '../styles/PostsPage.styled';
import type { DetailedCategory } from '../types';
import CategoryStats from './CategoryStats';
import FollowCategoryButton from './FollowCategoryButton';
import ResourceDetailsTop from './ResourceDetailsTop';

type CategoryDetailsProps = {
  loadingPosts: boolean;
  setResourceError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoadingResource: React.Dispatch<React.SetStateAction<boolean>>;
};

function CategoryDetails({
  loadingPosts,
  setResourceError,
  setLoadingResource,
}: CategoryDetailsProps) {
  const { user, setUser } = useUserAndTheme();
  const { slug } = useParams();
  const {
    data: category,
    setData: setCategory,
    loading,
    error,
  } = useFetchPageData<DetailedCategory>(`${API_URL}/categories/${slug}`);
  const errorMessageRef = useRef<HTMLParagraphElement>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<DetailedCategory['_id'] | null>(
    null,
  );

  async function handleCategoryButtonClick(
    categoryID: DetailedCategory['_id'],
  ) {
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
      if (!errorMessageRef.current) return;
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
      if (!draft) return;
      if (user.followed_categories.includes(categoryID)) {
        draft.followersCount--;
        return;
      }
      draft.followersCount++;
    });
  }

  useSyncWithParent(error, loading, setResourceError, setLoadingResource);

  if (category && !loadingPosts) {
    const { description } = category;

    return (
      <StyledResourceDetails>
        <ResourceDetailsTop resourceType="category" object={category} />
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
            category={category}
            inProgress={inProgress}
            handleCategoryButtonClick={handleCategoryButtonClick}
          />
        </div>
      </StyledResourceDetails>
    );
  }
}

export default CategoryDetails;
