import PropTypes from 'prop-types';
import API_URL from '../API';
import { useOutletContext, useParams } from 'react-router-dom';
import { StyledPostsPage } from '../styles/PostsPage.styled';
import { useChangeTitle, useFetchPosts, useSortPosts } from '../hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../components/Post';
import Error from '../components/Error';
import Loading from '../components/Loading';
import CategoryDetails from '../components/CategoryDetails';
import UserDetails from '../components/UserDetails';
import PostsSorter from '../components/PostsSorter';
import NoPostsSection from '../components/NoPostsSection';
import LoadingInfiniteScroll from '../components/LoadingInfiniteScroll';
import EndInfiniteScroll from '../components/EndInfiniteScroll';
import { useState } from 'react';
import {
  dislikePost,
  fetchMorePosts,
  likePost,
  POSTS_PER_FETCH,
} from '../helpers';

function PostsPage({
  fetchQuery = '',
  pageDescription = 'All Posts',
  isCategoryPage = false,
  isUserPage = false,
}) {
  const { user } = useOutletContext();
  // Get the category/user to retrieve from the URL parameter
  const { slug, username } = useParams();
  if (slug) {
    fetchQuery += slug;
  }
  if (username) {
    fetchQuery += username;
  }
  const { posts, setPosts, loading, error, setError, hasMore, setHasMore } =
    useFetchPosts(`${API_URL}/posts/${fetchQuery}`, POSTS_PER_FETCH);
  const [inProgress, setInProgress] = useState(false);
  const [resourceError, setResourceError] = useState(false);
  const [loadingResource, setLoadingResource] = useState(false);

  useChangeTitle(pageDescription);
  const { sortBy, setSortBy } = useSortPosts(posts, setPosts);

  function renderPosts() {
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          post={post}
          user={user}
          handlePostLikeClick={handleLikeClick}
          handlePostDislikeClick={handleDislikeClick}
        />
      );
    });
  }

  async function handleLikeClick(post) {
    await likePost(
      post,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPosts,
    );
  }

  async function handleDislikeClick(post) {
    await dislikePost(
      post,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPosts,
    );
  }

  async function handleInfiniteScroll() {
    await fetchMorePosts(
      `${API_URL}/posts/${fetchQuery}`,
      POSTS_PER_FETCH,
      posts.length,
      setPosts,
      setHasMore,
    );
  }

  if (error || resourceError)
    return (
      <StyledPostsPage>
        <Error errorMessage={error || resourceError} />
      </StyledPostsPage>
    );

  return (
    <StyledPostsPage>
      {isCategoryPage && (
        <CategoryDetails
          loadingPosts={loading}
          setResourceError={setResourceError}
          setLoadingResource={setLoadingResource}
        />
      )}
      {isUserPage && (
        <UserDetails
          loadingPosts={loading}
          setResourceError={setResourceError}
          setLoadingResource={setLoadingResource}
        />
      )}
      {!error && <h1 className="top-header">Feed - {pageDescription}</h1>}
      {loading && <Loading message={pageDescription} />}
      {posts && !loadingResource && (
        <>
          {posts?.length === 0 ? (
            <NoPostsSection
              isCategoryPage={isCategoryPage}
              isUserPage={isUserPage}
            />
          ) : (
            <>
              <PostsSorter sortBy={sortBy} setSortBy={setSortBy} />
              <InfiniteScroll
                dataLength={posts.length}
                next={handleInfiniteScroll}
                hasMore={hasMore}
                loader={<LoadingInfiniteScroll />}
                endMessage={<EndInfiniteScroll />}
                className="posts-wrapper"
              >
                {renderPosts()}
              </InfiniteScroll>
            </>
          )}
        </>
      )}
    </StyledPostsPage>
  );
}

PostsPage.propTypes = {
  fetchQuery: PropTypes.string,
  pageDescription: PropTypes.string,
  isCategoryPage: PropTypes.bool,
  isUserPage: PropTypes.bool,
};

export default PostsPage;
