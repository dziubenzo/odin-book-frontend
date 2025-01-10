import { StyledPostSorter } from '../styles/PostsPage.styled';
import type { SortBy as SortByType } from '../types';

type PostSorterProps = {
  sortBy: SortByType;
  setSortBy: React.Dispatch<React.SetStateAction<SortByType>>;
};

function PostsSorter({ sortBy, setSortBy }: PostSorterProps) {
  function handleSortButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    const btnDescription = event.currentTarget!.textContent!.toLowerCase();
    if (
      btnDescription === 'newest' ||
      btnDescription === 'oldest' ||
      btnDescription === 'likes' ||
      btnDescription === 'comments'
    ) {
      setSortBy(btnDescription);
      localStorage.setItem('sortBy', btnDescription);
    }
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

export default PostsSorter;
