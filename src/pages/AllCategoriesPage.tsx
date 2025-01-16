import { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { followOrUnfollowCategory } from '../helpers';
import { useChangeTitle, useFetchPageData, useUserAndTheme } from '../hooks';
import { StyledAllCategoriesPage } from '../styles/AllCategoriesPage.styled';
import type { Category as CategoryType } from '../types';

function AllCategoriesPage() {
  const { user, setUser } = useUserAndTheme();
  const {
    data: categories,
    loading,
    error,
    setError,
  } = useFetchPageData<CategoryType[]>(`/categories`);
  const [inProgress, setInProgress] = useState<CategoryType['_id'] | null>(
    null,
  );

  useChangeTitle('All Categories');

  function renderCategories() {
    if (!categories) return;
    return categories.map((category) => {
      return (
        <Category
          key={category._id}
          category={category}
          handleCategoryButtonClick={handleCategoryButtonClick}
          inProgress={inProgress}
        />
      );
    });
  }

  async function handleCategoryButtonClick(categoryID: CategoryType['_id']) {
    await followOrUnfollowCategory(
      inProgress,
      user,
      categoryID,
      setInProgress,
      setError,
      setUser,
    );
  }

  return (
    <StyledAllCategoriesPage>
      {loading && <Loading message="All Categories" />}
      {error && <Error errorMessage={error} />}
      {categories && (
        <>
          <h1 className="top-header">All Categories ({categories.length})</h1>
          {renderCategories()}
          <div className="new-category-link-wrapper">
            <Link
              to={'/categories/new'}
              className="new-category-link"
              title="Create New Category"
            >
              <IoCreateOutline />
            </Link>
          </div>
        </>
      )}
    </StyledAllCategoriesPage>
  );
}

export default AllCategoriesPage;
