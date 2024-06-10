/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';

import PostDetailsPage from '../pages/PostDetailsPage';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

import { mockFetch } from './fetchMock';
import { detailedPost1, superUser } from './mocks';

function renderComponent() {
  // Mock useOutletContext and useParams hooks
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useParams: () => {
        return {
          slug: `${detailedPost1.slug}`,
        };
      },
      useOutletContext: () => [superUser],
    };
  });

  render(
    <BrowserRouter>
      <Theme>
        <PostDetailsPage />
      </Theme>
    </BrowserRouter>,
  );
}

test('the component should show a loading message immediately after rendering', () => {
  mockFetch('Failed to fetch', false);
  renderComponent();

  const loadingMessage = screen.getByRole('heading', {
    name: /loading post/i,
  });

  expect(loadingMessage).toBeInTheDocument();
});

test('the component should show an error message if fetching the post fails', async () => {
  mockFetch('Failed to fetch', false);
  renderComponent();

  const errorMessage = await screen.findByText(/failed to fetch/i);

  expect(errorMessage).toBeInTheDocument();
});

test('the component should show a Post Details section', async () => {
  mockFetch(detailedPost1, true);
  renderComponent();

  const postTitle = await screen.findByRole('heading', {
    name: /post 1 detailed/i,
  });
  const postContent = await screen.findByText(/detailed content/i);

  expect(postTitle).toBeInTheDocument();
  expect(postContent).toBeInTheDocument();
});

test('the component should show a New Comment section with a Submit button', async () => {
  mockFetch(detailedPost1, true);
  renderComponent();

  const newCommentHeading = await screen.findByRole('heading', {
    name: /new comment/i,
  });
  const submitButton = await screen.findByRole('button');

  expect(newCommentHeading).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('the component should show a Comments section with all comments', async () => {
  mockFetch(detailedPost1, true);
  renderComponent();

  const commentsHeading = await screen.findByRole('heading', {
    name: /comments/i,
  });
  const allComments = await screen.findAllByText(/comment content/i);

  expect(commentsHeading).toBeInTheDocument();
  expect(allComments).toHaveLength(detailedPost1.comments.length);
});
