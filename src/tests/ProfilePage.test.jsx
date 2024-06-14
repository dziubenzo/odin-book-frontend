/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import ProfilePage from '../pages/ProfilePage';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

import { mockFetch } from './fetchMock';
import { user2 } from './mocks';
import { defaultAvatars } from '../helpers';

function renderProfilePage() {
  // Mock useOutletContext and useParams hooks
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOutletContext: () => [user2, vi.fn()],
    };
  });

  render(
    <BrowserRouter>
      <Theme>
        <ProfilePage />
      </Theme>
    </BrowserRouter>,
  );
}

describe('PostInfo', () => {
  it('should render an avatar', () => {
    renderProfilePage();

    const avatarImg = screen.getByRole('img', {
      name: `${user2.username}'s avatar`,
    });

    expect(avatarImg).toBeInTheDocument();
  });

  it('should render a link to the user page', () => {
    renderProfilePage();

    const userLink = screen.getByRole('link', {
      name: /user2/i,
    });

    expect(userLink).toBeInTheDocument();
    expect(userLink).toHaveAttribute('href', `/users/${user2.username}`);
  });

  it('should render a heading with the correct registration date', () => {
    renderProfilePage();

    const heading = screen.getByRole('heading', {
      name: new RegExp(new Date().getFullYear()),
    });

    expect(heading).toBeInTheDocument();
  });

  it('should render a link to the previous page page', () => {
    renderProfilePage();

    const previousPageLink = screen.getByRole('link', {
      name: /previous page/i,
    });

    expect(previousPageLink).toBeInTheDocument();
  });
});

describe('DefaultAvatars', () => {
  it('should render all default avatars', () => {
    renderProfilePage();

    const defaultAvatarImgs = screen.getAllByRole('img', {
      name: /default avatar/i,
    });

    expect(defaultAvatarImgs).toHaveLength(defaultAvatars.length);
  });
});
