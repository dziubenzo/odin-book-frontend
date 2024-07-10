import PropTypes from 'prop-types';
import { StyledPostSorter } from '../styles/PostsPage.styled';

function PostsSorter({ sortBy, setSortBy }) {
  function handleSortButtonClick(event) {
    setSortBy(event.target.textContent.toLowerCase());
    localStorage.setItem('sortBy', event.target.textContent.toLowerCase());
  }

  return (
    <StyledPostSorter>
      <p>Sort By:</p>
      <div className="sort-buttons">
        <button
          className={sortBy === 'newest' ? 'selected' : undefined}
          onClick={handleSortButtonClick}
        >
          Newest
        </button>
        <button
          className={sortBy === 'oldest' ? 'selected' : undefined}
          onClick={handleSortButtonClick}
        >
          Oldest
        </button>
        <button
          className={sortBy === 'likes' ? 'selected' : undefined}
          onClick={handleSortButtonClick}
        >
          Likes
        </button>
        <button
          className={sortBy === 'comments' ? 'selected' : undefined}
          onClick={handleSortButtonClick}
        >
          Comments
        </button>
      </div>
    </StyledPostSorter>
  );
}

PostsSorter.propTypes = {
  sortBy: PropTypes.string,
  setSortBy: PropTypes.func,
};

export default PostsSorter;
