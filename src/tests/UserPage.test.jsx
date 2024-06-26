/* eslint-disable no-undef */

import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect } from 'vitest';

import UserPage from '../pages/UserPage';
import UserStats from '../components/UserStats';
import UserStat from '../components/UserStat';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import { mockFetch } from './fetchMock';
import { STATS_COUNT, user4, user5 } from './mocks';
import { DiAndroid } from 'react-icons/di';

function renderUserPage() {
  const mockFollowCategory = vi.fn();
  const user = userEvent.setup();

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
      useOutletContext: () => [user4],
    };
  });

  render(
    <BrowserRouter>
      <Theme>
        <UserPage />
      </Theme>
    </BrowserRouter>,
  );

  return { mockFollowCategory, user };
}

function renderUserStats() {
  render(
    <Theme>
      <UserStats user={user4} />
    </Theme>,
  );
}

function renderUserStat() {
  const description = 'Two Cubed';
  const count = 8;

  render(
    <Theme>
      <UserStat
        IconComponent={DiAndroid}
        description={description}
        count={count}
      />
    </Theme>,
  );

  return { description, count };
}

describe('UserPage', () => {
  it('should show a loading message immediately after rendering', () => {
    mockFetch('Failed to fetch', false);
    renderUserPage();

    const loadingMessage = screen.getByRole('heading', {
      name: /loading user info/i,
    });

    expect(loadingMessage).toBeInTheDocument();
  });

  it('should show an error message if fetching categories fails', async () => {
    mockFetch('Failed to fetch', false);
    renderUserPage();

    const errorMessage = await screen.findByText(/failed to fetch/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render a bio if the rendered user has a bio', async () => {
    mockFetch(user4, true);
    renderUserPage();

    const bio = await screen.findByTestId('bio');

    expect(bio).toBeInTheDocument();
  });

  it('should not render a bio if the rendered user does not have a bio', async () => {
    mockFetch(user5, true);
    renderUserPage();

    // Wait for mockFetch to populate the page
    // This allows me to use the queryBy query to check for the non-existence of something in proper setting
    await waitFor(() => {}, { timeout: 0 });

    const bio = screen.queryByTestId('bio');

    expect(bio).not.toBeInTheDocument();
  });

  it('should render a Follow/Unfollow button', async () => {
    mockFetch(user5, true);
    renderUserPage();

    const followButton = await screen.findByRole('button');

    expect(followButton).toBeInTheDocument();
  });

  it('should not render a Follow/Unfollow button if the rendered user is the logged in user', async () => {
    mockFetch(user4, true);
    renderUserPage();

    await waitFor(() => {}, { timeout: 0 });

    const followButton = screen.queryByRole('button');

    expect(followButton).not.toBeInTheDocument();
  });
});

describe('UserStats', () => {
  it('should render a heading', () => {
    renderUserStats();

    const userStatsHeading = screen.getByRole('heading');

    expect(userStatsHeading).toBeInTheDocument();
  });

  it('should render user stats of STATS_COUNT length', () => {
    renderUserStats();

    const icons = screen.getAllByTitle(/icon/i);

    expect(icons).toHaveLength(STATS_COUNT);
  });
});

describe('UserStat', () => {
  it('should render an icon with the correct title', () => {
    const { description } = renderUserStat();

    const icon = screen.getByTitle(new RegExp(`${description} icon`, 'i'));

    expect(icon).toBeInTheDocument();
  });

  it('should render a user stat description', () => {
    const { description: descriptionProp } = renderUserStat();

    const description = screen.getByText(descriptionProp);

    expect(description).toBeInTheDocument();
  });

  it('should render a user stat count', () => {
    const { count: countProp } = renderUserStat();

    const count = screen.getByText(countProp);

    expect(count).toBeInTheDocument();
  });
});
