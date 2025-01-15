import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import API_URL from '../API';
import CategoryDetails from '../components/CategoryDetails';
import EndInfiniteScroll from '../components/EndInfiniteScroll';
import Error from '../components/Error';
import Loading from '../components/Loading';
import LoadingInfiniteScroll from '../components/LoadingInfiniteScroll';
import NoPostsSection from '../components/NoPostsSection';
import Post from '../components/Post';
import PostsSorter from '../components/PostsSorter';
import UserDetails from '../components/UserDetails';
import { POSTS_PER_FETCH } from '../constants';
import { dislikePost, fetchMorePosts, likePost } from '../helpers';
import {
  useChangeTitle,
  useFetchPosts,
  useSortPosts,
  useUserAndTheme,
} from '../hooks';
import { StyledPostsPage } from '../styles/PostsPage.styled';
import type { Post as PostType } from '../types';

type PostsPageProps = {
  pageDescription: string;
  fetchQuery?: string;
  isCategoryPage?: boolean;
  isUserPage?: boolean;
};

function PostsPage({
  pageDescription,
  fetchQuery = '',
  isCategoryPage,
  isUserPage,
}: PostsPageProps) {
  const { user } = useUserAndTheme();
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
  const [resourceError, setResourceError] = useState<string | null>(null);
  const [loadingResource, setLoadingResource] = useState(false);

  useChangeTitle(pageDescription);
  const { sortBy, setSortBy } = useSortPosts(posts, setPosts);

  function renderPosts() {
    if (!posts) return;
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          post={post}
          handlePostLikeClick={handleLikeClick}
          handlePostDislikeClick={handleDislikeClick}
        />
      );
    });
  }

  async function handleLikeClick(post: PostType) {
    await likePost(
      post,
      user._id,
      inProgress,
      setInProgress,
      setError,
      setPosts,
    );
  }

  async function handleDislikeClick(post: PostType) {
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
    if (!posts) return;
    await fetchMorePosts(
      `${API_URL}/posts/${fetchQuery}`,
      POSTS_PER_FETCH,
      posts.length,
      setPosts,
      setHasMore,
    );
  }

  if (error || resourceError) {
    if (error) {
      return (
        <StyledPostsPage>
          <Error errorMessage={error} />
        </StyledPostsPage>
      );
    } else if (resourceError) {
      return (
        <StyledPostsPage>
          <Error errorMessage={resourceError} />
        </StyledPostsPage>
      );
    }
  }

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
                style={{ overflow: 'hidden' }}
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

export default PostsPage;
