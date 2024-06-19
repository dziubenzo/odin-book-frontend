import API_URL from '../API';
import { useOutletContext } from 'react-router-dom';
import { StyledAllCategoriesPage } from '../styles/AllCategoriesPage.styled';
import { useFetchPageData } from '../hooks';
import { useState } from 'react';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Category from '../components/Category';
import { followOrUnfollowCategory } from '../helpers';

function AllCategoriesPage() {
  const [user, setUser] = useOutletContext();
  const {
    data: categories,
    setData: setCategories,
    loading,
    error,
    setError,
  } = useFetchPageData(`${API_URL}/categories`);
  const [inProgress, setInProgress] = useState(false);

  function renderCategories() {
    return categories.map((category) => {
      return (
        <Category
          key={category._id}
          user={user}
          category={category}
          handleCategoryButtonClick={handleCategoryButtonClick}
          inProgress={inProgress}
        />
      );
    });
  }

  async function handleCategoryButtonClick(categoryID) {
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
        </>
      )}
    </StyledAllCategoriesPage>
  );
}

export default AllCategoriesPage;
