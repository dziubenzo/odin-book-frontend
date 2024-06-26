/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import AllUsersPage from '../pages/AllUsersPage';
import User from '../components/User';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import { mockFetch } from './fetchMock';
import { user2, user3 } from './mocks';

const users = [user2, user3];

function renderAllUsersPage() {
  // Mock useOutletContext
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOutletContext: () => [user2],
    };
  });

  render(
    <BrowserRouter>
      <Theme>
        <AllUsersPage />
      </Theme>
    </BrowserRouter>,
  );
}

function renderUser(loggedInUser, renderedUser, inProgress) {
  const mockFollowUser = vi.fn();
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <User
          loggedInUser={loggedInUser}
          user={renderedUser}
          handleUserButtonClick={mockFollowUser}
          inProgress={inProgress}
        />
      </Theme>
    </BrowserRouter>,
  );

  return { mockFollowUser, user };
}

describe('AllUsersPage', () => {
  it('should show a loading message immediately after rendering', () => {
    mockFetch('Failed to fetch', false);
    renderAllUsersPage();

    const loadingMessage = screen.getByRole('heading', {
      name: /loading all users/i,
    });

    expect(loadingMessage).toBeInTheDocument();
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

    const allUsersHeading = await screen.findByRole('heading', {
      name: /all users \(/i,
    });

    expect(allUsersHeading.textContent).toContain(users.length);
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
    renderUser(user2, user3, false);

    const userAvatar = screen.getByRole('img', {
      name: new RegExp(`${user3.username}'s avatar`, 'i'),
    });

    expect(userAvatar).toBeInTheDocument();
  });

  it("should render user's username", () => {
    renderUser(user2, user3, false);

    const userUsername = screen.getByText(new RegExp(user3.username, 'i'));

    expect(userUsername).toBeInTheDocument();
  });

  it('should render a link to the user page', () => {
    renderUser(user2, user3, false);

    const userLink = screen.getByRole('link');

    expect(userLink).toBeInTheDocument();
    expect(userLink).toHaveAttribute('href', `/users/${user3.username}`);
  });

  it('should render a Follow/Unfollow button, which calls a follow/unfollow function with user ID if clicked', async () => {
    const { mockFollowUser, user } = renderUser(user2, user3, false);

    const followButton = screen.getByRole('button');

    expect(followButton).toBeInTheDocument();

    await user.click(followButton);

    expect(mockFollowUser).toHaveBeenCalledTimes(1);
    expect(mockFollowUser).toHaveBeenCalledWith(user3._id);
  });

  it('should render a Follow button description if the user is not followed by the logged in user', () => {
    renderUser(user2, user3, false);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toBe('Follow');
  });

  it('should render an Unfollow button description if the user is followed by the logged in user', () => {
    renderUser(user3, user2, false);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toBe('Unfollow');
  });

  it('should render a Changing button description if the user is being followed/unfollowed by the logged in user', () => {
    renderUser(user2, user3, user3._id);

    const followButton = screen.getByRole('button');

    expect(followButton.textContent).toMatch(/changing/i);
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
