import { isSameMonth } from 'date-fns';
import { Fragment, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import CategoryDetails from '../components/CategoryDetails';
import EndInfiniteScroll from '../components/EndInfiniteScroll';
import Error from '../components/Error';
import LoadingInfiniteScroll from '../components/LoadingInfiniteScroll';
import MonthIndicator from '../components/MonthIndicator';
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
import PostsSkeleton from '../skeletons/PostsSkeleton';
import { StyledPostsPage } from '../styles/PostsPage.styled';
import type { FetchQuery, Post as PostType } from '../types';

type PostsPageProps = {
  pageDescription: string;
  fetchQuery?: FetchQuery;
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
    useFetchPosts(`/posts/${fetchQuery}`, POSTS_PER_FETCH);
  const [inProgress, setInProgress] = useState(false);

  useChangeTitle(pageDescription);
  const { sortBy, setSortBy } = useSortPosts(posts, setPosts);

  function renderPosts() {
    if (!posts) return;
    return posts.map((post, index) => {
      return (
        <Fragment key={post._id}>
          {(sortBy === 'oldest' || sortBy === 'newest') && index === 0 && (
            <MonthIndicator date={post.created_at} />
          )}
          {(sortBy === 'oldest' || sortBy === 'newest') &&
            index > 0 &&
            !isSameMonth(post.created_at, posts[index - 1].created_at) && (
              <MonthIndicator date={post.created_at} />
            )}
          <Post
            post={post}
            handlePostLikeClick={handleLikeClick}
            handlePostDislikeClick={handleDislikeClick}
            inProgress={inProgress}
          />
        </Fragment>
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
      `/posts/${fetchQuery}`,
      POSTS_PER_FETCH,
      posts.length,
      setPosts,
      setHasMore,
    );
  }

  if (error) {
    return (
      <StyledPostsPage>
        <Error errorMessage={error} />
      </StyledPostsPage>
    );
  }

  return (
    <StyledPostsPage>
      {isCategoryPage && <CategoryDetails setPageError={setError} />}
      {isUserPage && <UserDetails setPageError={setError} />}
      {!error && <h1 className="top-header">Feed - {pageDescription}</h1>}
      {loading && <PostsSkeleton length={6} />}
      {posts && (
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
