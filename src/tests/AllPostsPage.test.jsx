/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';

import AllPostsPage from '../pages/AllPostsPage';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

import { mockFetch } from './fetchMock';
import { post1, post2, post3, superUser } from './mocks';

function renderComponent() {
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
        <AllPostsPage />
      </Theme>
    </BrowserRouter>,
  );
}

test('the component should show a loading message immediately after rendering', () => {
  mockFetch('Failed to fetch', false);
  renderComponent();

  const loadingMessage = screen.getByRole('heading', {
    name: /loading all posts/i,
  });

  expect(loadingMessage).toBeInTheDocument();
});

test('the component should show an error message if fetching posts fails', async () => {
  mockFetch('Failed to fetch', false);
  renderComponent();

  const errorMessage = await screen.findByText(/failed to fetch/i);

  expect(errorMessage).toBeInTheDocument();
});

test('the component should show a feed heading and render posts fetched if fetching posts succeeds', async () => {
  mockFetch([post1, post2, post3], true);
  renderComponent();

  const feedHeading = await screen.findByRole('heading', { name: /feed/i });
  const postContents = await screen.findAllByText(/content/i);

  expect(feedHeading).toBeInTheDocument();
  expect(postContents).toHaveLength(3);
});
