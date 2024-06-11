/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Comments from '../components/Comments';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

import { detailedPost1, superUser } from './mocks';

const { comments } = detailedPost1;

function renderComments() {
  const likeCommentFn = vi.fn();
  const dislikeCommentFn = vi.fn();
  const user = userEvent.setup();

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
        <Comments
          comments={comments}
          handleCommentLikeClick={likeCommentFn}
          handleCommentDislikeClick={dislikeCommentFn}
        />
      </Theme>
    </BrowserRouter>,
  );

  return { user, likeCommentFn, dislikeCommentFn };
}

describe('Comments', () => {
  it('should render a Comments heading with the correct number of post comments', () => {
    renderComments();

    const commentsHeading = screen.getByRole('heading');

    expect(commentsHeading.textContent).toBe(`Comments (${comments.length})`);
  });

  it('should render all comments', () => {
    renderComments();

    const allComments = screen.getAllByText(/comment content/i);

    expect(allComments).toHaveLength(comments.length);
  });
});
