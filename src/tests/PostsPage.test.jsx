/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import PostsPage from '../pages/PostsPage';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

import { mockFetch } from './fetchMock';
import { post1, post2, post3, superUser } from './mocks';

function renderComponent(pageDescription) {
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

describe('PostsPage', () => {
  it('should render a loading message immediately after rendering', () => {
    mockFetch('Failed to fetch', false);
    renderComponent();

    const loadingMessage = screen.getByRole('heading', {
      name: /loading/i,
    });

    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render an error message if fetching posts fails', async () => {
    mockFetch('Failed to fetch', false);
    renderComponent();

    const errorMessage = await screen.findByText(/failed to fetch/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render a feed heading and render posts fetched if fetching posts succeeds', async () => {
    mockFetch([post1, post2, post3], true);
    renderComponent();

    const feedHeading = await screen.findByRole('heading', { name: /feed/i });
    const postContents = await screen.findAllByText(/content/i);

    expect(feedHeading).toBeInTheDocument();
    expect(postContents).toHaveLength(3);
  });

  it('should render a default feed heading if no pageDescription prop is provided', async () => {
    mockFetch([post1, post2, post3], true);
    renderComponent();

    const feedHeading = await screen.findByRole('heading', {
      name: /all posts/i,
    });

    expect(feedHeading).toBeInTheDocument();
  });

  it('should render a different feed heading if the pageDescription prop is provided', async () => {
    const prop = 'All Beavers Sorted By Teeth Length';
    mockFetch([post1, post2, post3], true);
    renderComponent(prop);

    const feedHeading = await screen.findByRole('heading', {
      name: new RegExp(prop, 'i'),
    });

    expect(feedHeading).toBeInTheDocument();
  });

  it('should render a no posts found section if there are no posts to show', async () => {
    mockFetch([], true);
    renderComponent();

    const noPostsHeading = await screen.findByRole('heading', {
      name: /no posts found/i,
    });

    expect(noPostsHeading).toBeInTheDocument();
  });
});
