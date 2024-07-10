/* eslint-disable no-undef */

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PostsPage from '../pages/PostsPage';
import PostLikes from '../components/PostLikes';
import PostBody from '../components/PostBody';
import CategoryDetails from '../components/CategoryDetails';
import UserDetails from '../components/UserDetails';
import Stat from '../components/Stat';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import { mockFetch } from './fetchMock';
import {
  category1,
  CATEGORY_STATS_COUNT,
  post1,
  post2,
  post3,
  superUser,
  user1,
  user2,
  user4,
  user5,
  USER_STATS_COUNT,
} from './mocks';
import { DiAndroid } from 'react-icons/di';

function renderPostsPage(pageDescription) {
  // Mock useOutletContext hook only
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOutletContext: () => {
        return {
          user: superUser,
        };
      },
    };
  });
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <PostsPage pageDescription={pageDescription} />
      </Theme>
    </BrowserRouter>,
  );

  return user;
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

function renderCategoryDetails(loadingPosts = false) {
  const setResourceErrorMock = vi.fn();
  const setLoadingResourceMock = vi.fn();
  // Mock useParams and useOutletContext
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useParams: () => {
        return {
          slug: category1.slug,
        };
      },
      useOutletContext: () => {
        return {
          user: user4,
        };
      },
    };
  });

  render(
    <BrowserRouter>
      <Theme>
        <CategoryDetails
          loadingPosts={loadingPosts}
          setResourceError={setResourceErrorMock}
          setLoadingResource={setLoadingResourceMock}
        />
      </Theme>
    </BrowserRouter>,
  );

  return { setResourceErrorMock, setLoadingResourceMock };
}

function renderUserDetails(loadingPosts = false) {
  const setResourceErrorMock = vi.fn();
  const setLoadingResourceMock = vi.fn();
  // Mock useParams and useOutletContext
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useParams: () => {
        return {
          username: user4.username,
        };
      },
      useOutletContext: () => {
        return {
          user: user4,
        };
      },
    };
  });

  render(
    <BrowserRouter>
      <Theme>
        <UserDetails
          loadingPosts={loadingPosts}
          setResourceError={setResourceErrorMock}
          setLoadingResource={setLoadingResourceMock}
        />
      </Theme>
    </BrowserRouter>,
  );

  return { setResourceErrorMock, setLoadingResourceMock };
}

function renderStat() {
  const description = 'Two Cubed';
  const count = 8;

  render(
    <Theme>
      <Stat IconComponent={DiAndroid} description={description} count={count} />
    </Theme>,
  );

  return { description, count };
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

describe('PostsSorter', () => {
  it("should render a 'Sort By' paragraph", async () => {
    mockFetch([post1], true);
    renderPostsPage();

    const sortByPara = await screen.findByText(/sort by/i);

    expect(sortByPara).toBeInTheDocument();
  });

  it('should render a Newest sort button, which is selected by default', async () => {
    mockFetch([post1], true);
    renderPostsPage();

    const newestButton = await screen.findByRole('button', { name: /newest/i });

    expect(newestButton).toBeInTheDocument();
    expect(newestButton).toHaveClass('selected');
  });

  it('should render an Oldest sort button, which is not selected', async () => {
    mockFetch([post1], true);
    renderPostsPage();

    const oldestButton = await screen.findByRole('button', { name: /oldest/i });

    expect(oldestButton).toBeInTheDocument();
    expect(oldestButton).not.toHaveClass('selected');
  });

  it('should render a Likes sort button, which is not selected', async () => {
    mockFetch([post1], true);
    renderPostsPage();

    const likesButton = await screen.findByRole('button', { name: /likes/i });

    expect(likesButton).toBeInTheDocument();
    expect(likesButton).not.toHaveClass('selected');
  });

  it('should render a Comments sort button, which is not selected', async () => {
    mockFetch([post1], true);
    renderPostsPage();

    const commentsButton = await screen.findByRole('button', {
      name: /comments/i,
    });

    expect(commentsButton).toBeInTheDocument();
    expect(commentsButton).not.toHaveClass('selected');
  });

  it('should render a Comments sort button, which, if clicked, should become selected and should make the previous sort button deselected', async () => {
    mockFetch([post1], true);
    const user = renderPostsPage();

    const newestButton = await screen.findByRole('button', { name: /newest/i });
    const commentsButton = await screen.findByRole('button', {
      name: /comments/i,
    });
    await user.click(commentsButton);

    expect(commentsButton).toHaveClass('selected');
    expect(newestButton).not.toHaveClass('selected');
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

describe('CategoryDetails', () => {
  it('should not render and should call the resourceError setter function with the error as the argument if fetching a category fails', async () => {
    const error = 'Error while fetching a category';
    mockFetch(error, false);
    const { setResourceErrorMock } = renderCategoryDetails();

    // Wait for mockFetch to populate the page
    // This allows me to use the queryBy query to check for the non-existence of something in proper setting
    await waitFor(() => {}, { timeout: 0 });
    const iconImg = screen.queryByRole('img', { name: /icon for the/i });

    expect(iconImg).not.toBeInTheDocument();
    expect(setResourceErrorMock).toHaveBeenCalled();
    expect(setResourceErrorMock).toHaveBeenCalledWith(error);
  });

  it('should not render anything while fetching', async () => {
    mockFetch({}, true);
    renderCategoryDetails();

    const loadingMessage = screen.queryByRole('heading', {
      name: /loading/i,
    });

    expect(loadingMessage).not.toBeInTheDocument();
  });

  it('should not render anything while posts are still being fetched', async () => {
    mockFetch({}, true);
    renderCategoryDetails(true);

    await waitFor(() => {}, { timeout: 0 });
    const loadingMessage = screen.queryByRole('heading', {
      name: /loading/i,
    });

    expect(loadingMessage).not.toBeInTheDocument();
  });

  it('should call the loadingResource setter function with false as the argument if fetching a category is successful', async () => {
    mockFetch(category1, true);
    const { setLoadingResourceMock } = renderCategoryDetails();

    await waitFor(() => {}, { timeout: 0 });

    expect(setLoadingResourceMock).toHaveBeenCalled();
    expect(setLoadingResourceMock).toHaveBeenCalledWith(false);
  });

  it('should render a category icon', async () => {
    mockFetch(category1, true);
    renderCategoryDetails();

    const iconImg = await screen.findByRole('img', { name: /icon for the/i });

    expect(iconImg).toBeInTheDocument();
  });

  it('should render a category name heading', async () => {
    mockFetch(category1, true);
    renderCategoryDetails();

    const categoryNameHeading = await screen.findByRole('heading');

    expect(categoryNameHeading).toBeInTheDocument();
    expect(categoryNameHeading.textContent).toMatch(
      new RegExp(category1.name),
      'i',
    );
  });

  it("should render a 'created' paragraph", async () => {
    mockFetch(category1, true);
    renderCategoryDetails();

    const createdPara = await screen.findByText(/created/i);

    expect(createdPara).toBeInTheDocument();
  });

  it('should render a category description', async () => {
    mockFetch(category1, true);
    renderCategoryDetails();

    const categoryDescription = await screen.findByText(
      new RegExp(category1.description),
      'i',
    );

    expect(categoryDescription).toBeInTheDocument();
  });

  it('should render category stats of CATEGORY_STATS_COUNT length', async () => {
    mockFetch(category1, true);
    renderCategoryDetails();

    const statIcons = await screen.findAllByTitle(/icon/i);

    expect(statIcons).toHaveLength(CATEGORY_STATS_COUNT);
  });

  it('should render a Follow/Unfollow category button', async () => {
    mockFetch(category1, true);
    renderCategoryDetails();

    const followButton = await screen.findByRole('button');

    expect(followButton).toBeInTheDocument();
  });
});

describe('UserDetails', () => {
  it('should not render and should call the resourceError setter function with the error as the argument if fetching a user fails', async () => {
    const error = 'Error while fetching a user';
    mockFetch(error, false);
    const { setResourceErrorMock } = renderUserDetails();

    // Wait for mockFetch to populate the page
    // This allows me to use the queryBy query to check for the non-existence of something in proper setting
    await waitFor(() => {}, { timeout: 0 });
    const iconImg = screen.queryByRole('img', { name: /icon for the/i });

    expect(iconImg).not.toBeInTheDocument();
    expect(setResourceErrorMock).toHaveBeenCalled();
    expect(setResourceErrorMock).toHaveBeenCalledWith(error);
  });

  it('should not render anything while fetching', async () => {
    mockFetch({}, true);
    renderUserDetails();

    const loadingMessage = screen.queryByRole('heading', {
      name: /loading/i,
    });

    expect(loadingMessage).not.toBeInTheDocument();
  });

  it('should not render anything while posts are still being fetched', async () => {
    mockFetch({}, true);
    renderUserDetails(true);

    await waitFor(() => {}, { timeout: 0 });
    const loadingMessage = screen.queryByRole('heading', {
      name: /loading/i,
    });

    expect(loadingMessage).not.toBeInTheDocument();
  });

  it('should call the loadingResource setter function with false as the argument if fetching a user is successful', async () => {
    mockFetch(user5, true);
    const { setLoadingResourceMock } = renderUserDetails();

    await waitFor(() => {}, { timeout: 0 });

    expect(setLoadingResourceMock).toHaveBeenCalled();
    expect(setLoadingResourceMock).toHaveBeenCalledWith(false);
  });

  it("should render a user's avatar", async () => {
    mockFetch(user5, true);
    renderUserDetails();

    const avatarImg = await screen.findByRole('img', { name: /avatar/i });

    expect(avatarImg).toBeInTheDocument();
  });

  it("should render a user's username heading", async () => {
    mockFetch(user5, true);
    renderUserDetails();

    const usernameHeading = await screen.findByRole('heading');

    expect(usernameHeading).toBeInTheDocument();
    expect(usernameHeading.textContent).toMatch(
      new RegExp(user5.username),
      'i',
    );
  });

  it("should render a 'member since' paragraph", async () => {
    mockFetch(user5, true);
    renderUserDetails();

    const memberSincePara = await screen.findByText(/member since/i);

    expect(memberSincePara).toBeInTheDocument();
  });

  it("should render a user's bio if the user has set their bio", async () => {
    mockFetch(user2, true);
    renderUserDetails();

    const userBio = await screen.findByText(new RegExp(user2.bio), 'i');

    expect(userBio).toBeInTheDocument();
  });

  it('should render a no bio message if the user has not set their bio', async () => {
    mockFetch(user5, true);
    renderUserDetails();

    const noBioMessage = await screen.findByText(/no bio/i);

    expect(noBioMessage).toBeInTheDocument();
  });

  it('should render user stats of USER_STATS_COUNT length', async () => {
    mockFetch(user5, true);
    renderUserDetails();

    const statIcons = await screen.findAllByTitle(/icon/i);

    expect(statIcons).toHaveLength(USER_STATS_COUNT);
  });

  it('should render a Follow/Unfollow user button', async () => {
    mockFetch(user5, true);
    renderUserDetails();

    const followButton = await screen.findByRole('button');

    expect(followButton).toBeInTheDocument();
  });

  it('should not render a Follow/Unfollow user button if the logged in user is the rendered user', async () => {
    mockFetch(user4, true);
    renderUserDetails();

    await waitFor(() => {}, { timeout: 0 });
    const followButton = screen.queryByRole('button');

    expect(followButton).not.toBeInTheDocument();
  });
});

describe('Stat', () => {
  it('should render an icon with the correct title', () => {
    const { description } = renderStat();

    const icon = screen.getByTitle(new RegExp(`${description} icon`, 'i'));

    expect(icon).toBeInTheDocument();
  });

  it('should render a user stat description', () => {
    const { description: descriptionProp } = renderStat();

    const description = screen.getByText(descriptionProp);

    expect(description).toBeInTheDocument();
  });

  it('should render a user stat count', () => {
    const { count: countProp } = renderStat();

    const count = screen.getByText(countProp);

    expect(count).toBeInTheDocument();
  });
});
