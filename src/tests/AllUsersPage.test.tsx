import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';
import FollowUserButton from '../components/FollowUserButton';
import Theme from '../components/Theme';
import User from '../components/User';
import AllUsersPage from '../pages/AllUsersPage';
import type { DetailedUser, User as UserType } from '../types';
import { mockFetch } from './fetchMock';
import { mockUseUserAndTheme } from './hookMocks';
import { user2, user3 } from './mocks';

const users = [user2, user3];

function renderAllUsersPage() {
  mockUseUserAndTheme(user2);

  render(
    <BrowserRouter>
      <Theme>
        <AllUsersPage />
      </Theme>
    </BrowserRouter>,
  );
}

function renderUser(
  loggedInUser: UserType,
  renderedUser: UserType,
  inProgress: UserType['_id'] | null,
) {
  const mockFollowUser = vi.fn();
  mockUseUserAndTheme(loggedInUser);
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <User
          user={renderedUser}
          handleUserButtonClick={mockFollowUser}
          inProgress={inProgress}
        />
      </Theme>
    </BrowserRouter>,
  );

  return { mockFollowUser, user };
}

function renderFollowUserButton(
  loggedInUser: UserType,
  renderedUser: DetailedUser | UserType,
  inProgress: DetailedUser['_id'] | UserType['_id'] | null,
) {
  const mockFollowUser = vi.fn();
  mockUseUserAndTheme(loggedInUser);
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <FollowUserButton
          renderedUser={renderedUser}
          handleUserButtonClick={mockFollowUser}
          inProgress={inProgress}
        />
      </Theme>
    </BrowserRouter>,
  );

  return { mockFollowUser, user };
}

describe('AllUsersPage', () => {
  it('should show a loading skeleton immediately after rendering', () => {
    mockFetch('Failed to fetch', false);
    renderAllUsersPage();

    const usernameLinks = screen.getAllByText(/username/i);

    expect(usernameLinks[0]).toHaveClass('skeleton');
  });

  it('should show an error message if fetching users fails', async () => {
    mockFetch('Failed to fetch', false);
    renderAllUsersPage();

    const errorMessage = await screen.findByText(/failed to fetch/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render a heading with the correct number of users', async () => {
    mockFetch(users, true);
    renderAllUsersPage();

    // Prevent skeleton from influencing the result
    await waitFor(async () => {
      const allUsersHeading = await screen.findByRole('heading', {
        name: /all users/i,
      });

      expect(allUsersHeading.textContent).toContain(users.length);
    });
  });

  it('should render all users', async () => {
    mockFetch(users, true);
    renderAllUsersPage();

    const userAvatars = await screen.findAllByRole('img', { name: /avatar/i });

    expect(userAvatars).toHaveLength(users.length);
  });
});

describe('User', () => {
  it("should render user's avatar", () => {
    renderUser(user2, user3, null);

    const userAvatar = screen.getByRole('img', {
      name: new RegExp(`${user3.username}'s avatar`, 'i'),
    });

    expect(userAvatar).toBeInTheDocument();
  });

  it("should render user's username", () => {
    renderUser(user2, user3, null);

    const userUsername = screen.getByText(new RegExp(user3.username, 'i'));

    expect(userUsername).toBeInTheDocument();
  });

  it('should render two links to the user page (avatar and username)', () => {
    renderUser(user2, user3, null);

    const userLinks = screen.getAllByRole('link');

    expect(userLinks).toHaveLength(2);

    for (const userLink of userLinks) {
      expect(userLink).toHaveAttribute('href', `/users/${user3.username}`);
    }
  });

  it("should only render logged in user's avatar and a link to the logged in user's profile if the rendered user is the logged in user", () => {
    renderUser(user2, user2, user3._id);

    const userAvatar = screen.queryByRole('img', {
      name: new RegExp(`${user2.username}'s avatar`, 'i'),
    });
    const userLink = screen.queryByRole('link');
    const userUsername = screen.queryByText(new RegExp(user2.username, 'i'));
    const followButton = screen.queryByRole('button');

    expect(userAvatar).toBeInTheDocument();
    expect(userLink).toBeInTheDocument();
    expect(userUsername).not.toBeInTheDocument();
    expect(followButton).not.toBeInTheDocument();
  });
});

describe('FollowUserButton', () => {
  it('should render a Follow/Unfollow button, which calls a follow/unfollow function with user ID if clicked', async () => {
    const { mockFollowUser, user } = renderFollowUserButton(user2, user3, null);

    const followButton = screen.getByRole('button');

    expect(followButton).toBeInTheDocument();

    await user.click(followButton);

    expect(mockFollowUser).toHaveBeenCalledTimes(1);
    expect(mockFollowUser).toHaveBeenCalledWith(user3._id);
  });

  it('should render a Follow button description if the user is not followed by the logged in user', () => {
    renderFollowUserButton(user2, user3, null);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toBe('Follow');
  });

  it('should render an Unfollow button description if the user is followed by the logged in user', () => {
    renderFollowUserButton(user3, user2, null);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toBe('Unfollow');
  });

  it('should render a Changing button description if the user is being followed/unfollowed by the logged in user', () => {
    renderFollowUserButton(user2, user3, user3._id);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toMatch(/changing/i);
  });
});
