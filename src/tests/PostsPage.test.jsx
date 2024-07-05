/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import PostsPage from '../pages/PostsPage';
import PostLikes from '../components/PostLikes';
import PostBody from '../components/PostBody';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import { mockFetch } from './fetchMock';
import { post1, post2, post3, superUser, user1 } from './mocks';

function renderPostsPage(pageDescription) {
  // Mock useOutletContext hook only
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOutletContext: () => [superUser],
    };
  });

  render(
    <BrowserRouter>
      <Theme>
        <PostsPage pageDescription={pageDescription} />
      </Theme>
    </BrowserRouter>,
  );
}

function renderPostLikes(loggedInUser) {
  const likeFn = vi.fn();
  const dislikeFn = vi.fn();
  const user = userEvent.setup();

  render(
    <Theme>
      <PostLikes
        post={post1}
        user={loggedInUser}
        handlePostLikeClick={likeFn}
        handlePostDislikeClick={dislikeFn}
      />
    </Theme>,
  );

  return { likeFn, dislikeFn, user };
}

function renderPostBody(post) {
  render(
    <BrowserRouter>
      <Theme>
        <PostBody post={post} />
      </Theme>
    </BrowserRouter>,
  );
}

describe('PostsPage', () => {
  it('should render a loading message immediately after rendering', () => {
    mockFetch('Failed to fetch', false);
    renderPostsPage();

    const loadingMessage = screen.getByRole('heading', {
      name: /loading/i,
    });

    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render an error message if fetching posts fails', async () => {
    mockFetch('Failed to fetch', false);
    renderPostsPage();

    const errorMessage = await screen.findByText(/failed to fetch/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render a feed heading and render posts fetched if fetching posts succeeds', async () => {
    mockFetch([post1, post2, post3], true);
    renderPostsPage();

    const feedHeading = await screen.findByRole('heading', { name: /feed/i });
    const postContents = await screen.findAllByText(/content/i);

    expect(feedHeading).toBeInTheDocument();
    expect(postContents).toHaveLength(3);
  });

  it('should render a default feed heading if no pageDescription prop is provided', async () => {
    mockFetch([post1, post2, post3], true);
    renderPostsPage();

    const feedHeading = await screen.findByRole('heading', {
      name: /all posts/i,
    });

    expect(feedHeading).toBeInTheDocument();
  });

  it('should render a different feed heading if the pageDescription prop is provided', async () => {
    const prop = 'All Beavers Sorted By Teeth Length';
    mockFetch([post1, post2, post3], true);
    renderPostsPage(prop);

    const feedHeading = await screen.findByRole('heading', {
      name: new RegExp(prop, 'i'),
    });

    expect(feedHeading).toBeInTheDocument();
  });

  it('should render a no posts found section if there are no posts to show', async () => {
    mockFetch([], true);
    renderPostsPage();

    const noPostsHeading = await screen.findByRole('heading', {
      name: /no posts found/i,
    });

    expect(noPostsHeading).toBeInTheDocument();
  });
});

describe('PostLikes', () => {
  it('should show likes count', () => {
    renderPostLikes(superUser);

    const likesCount = screen.getByTestId('likes-count');

    expect(likesCount).toBeInTheDocument();
  });

  it('should show correct likes count', () => {
    const likes = post1.likes.length;
    const dislikes = post1.dislikes.length;
    renderPostLikes(superUser);

    const likesCount = screen.getByTestId('likes-count');

    expect(likesCount.textContent).toBe((likes - dislikes).toString());
  });

  it('should call a function to like a post when the up arrow wrapper is clicked', async () => {
    const { user, likeFn } = renderPostLikes(superUser);

    const likePostDiv = screen.getByTitle('Like Post');
    await user.click(likePostDiv);

    expect(likeFn).toHaveBeenCalledTimes(1);
  });

  it('should call a function to dislike a post when the down arrow wrapper is clicked', async () => {
    const { user, dislikeFn } = renderPostLikes(superUser);

    const dislikePostDiv = screen.getByTitle(/dislike post/i);
    await user.click(dislikePostDiv);

    expect(dislikeFn).toHaveBeenCalledTimes(1);
  });

  it('should render an up arrow without the liked class if the post is not liked by the user', async () => {
    renderPostLikes(superUser);

    const upArrow = screen.getByTestId('up-arrow');

    expect(upArrow).not.toHaveClass(/liked/i);
  });

  it('should render a down arrow without the disliked class if the post is not disliked by the user', async () => {
    renderPostLikes(superUser);

    const downArrow = screen.getByTestId('down-arrow');

    expect(downArrow).not.toHaveClass(/disliked/i);
  });

  it('should render an up arrow with the liked class if the post is liked by the user', async () => {
    renderPostLikes(user1);

    const upArrow = screen.getByTestId('up-arrow');

    expect(upArrow).toHaveClass(/liked/i);
  });

  it('should render a down arrow with the disliked class if the post is disliked by the user', async () => {
    renderPostLikes(user1);

    const downArrow = screen.getByTestId('down-arrow');

    expect(downArrow).toHaveClass(/disliked/i);
  });
});

describe('PostBody', () => {
  it('should render a correct link to the post details page', () => {
    renderPostBody(post1);

    const postDetailsLink = screen.getByRole('link', {
      name: /post 1 post 1 content/i,
    });

    expect(postDetailsLink).toHaveAttribute('href', `/posts/${post1.slug}`);
  });

  it('should render a correct link to the post author page', () => {
    renderPostBody(post1);

    const postAuthorLink = screen.getByRole('link', {
      name: new RegExp(post1.author.username, 'i'),
    });

    expect(postAuthorLink).toHaveAttribute(
      'href',
      `/users/${post1.author.username}`,
    );
  });

  it('should render a correct link to the post category page', () => {
    renderPostBody(post1);

    const postCategoryLink = screen.getByRole('link', {
      name: new RegExp(post1.category.name, 'i'),
    });

    expect(postCategoryLink).toHaveAttribute(
      'href',
      `/categories/${post1.category.slug}`,
    );
  });

  it('should render a correct comments count', () => {
    const comments = post3.comments.length;
    renderPostBody(post3);

    const commentsCount = screen.getByTestId('comments-count');

    expect(commentsCount.textContent).toBe(comments.toString());
  });
});
