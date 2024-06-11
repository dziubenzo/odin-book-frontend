/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Comments from '../components/Comments';
import CommentBody from '../components/CommentBody';
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

function renderCommentBody() {
  const firstComment = comments[0];

  render(
    <BrowserRouter>
      <Theme>
        <CommentBody comment={firstComment} />
      </Theme>
    </BrowserRouter>,
  );

  return firstComment;
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

describe('CommentBody', () => {
  it('should render a comment author link that goes to the comment author profile page', () => {
    const firstComment = renderCommentBody();

    const commentAuthorLink = screen.getByRole('link');

    expect(commentAuthorLink.textContent).toBe(firstComment.author.username);
    expect(commentAuthorLink).toHaveAttribute(
      'href',
      `/users/${firstComment.author.username}`,
    );
  });

  it('should render comment content', () => {
    const firstComment = renderCommentBody();

    const commentContent = screen.getByText(new RegExp(firstComment.content));

    expect(commentContent).toBeInTheDocument();
  });
});
