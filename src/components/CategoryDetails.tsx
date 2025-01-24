import { useEffect, useRef, useState } from 'react';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { followOrUnfollowCategory } from '../helpers';
import { useFetchPageData, useUserAndTheme } from '../hooks';
import ResourceDetailsSkeleton from '../skeletons/ResourceDetailsSkeleton';
import { StyledResourceDetails } from '../styles/PostsPage.styled';
import type { DetailedCategory } from '../types';
import CategoryStats from './CategoryStats';
import FollowCategoryButton from './FollowCategoryButton';
import ResourceDetailsTop from './ResourceDetailsTop';

type CategoryDetailsProps = {
  setPageError: React.Dispatch<React.SetStateAction<string | null>>;
};

function CategoryDetails({ setPageError }: CategoryDetailsProps) {
  const { user, setUser } = useUserAndTheme();
  const { slug } = useParams();
  const {
    data: category,
    setData: setCategory,
    loading,
    error,
  } = useFetchPageData<DetailedCategory>(`/categories/${slug}`);
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

  // Throw a page-wide error if fetching fails
  useEffect(() => {
    if (error) {
      setPageError(error);
    }
  }, [error]);

  if (loading) {
    return <ResourceDetailsSkeleton type="category" />;
  }

  if (category) {
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
