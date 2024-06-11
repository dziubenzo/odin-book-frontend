/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Comments from '../components/Comments';
import CommentBody from '../components/CommentBody';
import CommentLikes from '../components/CommentLikes';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

import { detailedPost1, superUser, user1 } from './mocks';

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

function renderCommentLikes(loggedInUser) {
  const firstComment = comments[0];
  const likeFn = vi.fn();
  const dislikeFn = vi.fn();
  const user = userEvent.setup();

  render(
    <Theme>
      <CommentLikes
        comment={firstComment}
        user={loggedInUser}
        handleCommentLikeClick={likeFn}
        handleCommentDislikeClick={dislikeFn}
      />
    </Theme>,
  );

  return { firstComment, user, likeFn, dislikeFn };
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

describe('CommentLikes', () => {
  it('should render the correct likes count', () => {
    const { firstComment } = renderCommentLikes(superUser);

    const likesCount = screen.getByText(
      new RegExp(firstComment.likes.length - firstComment.dislikes.length),
    );

    expect(likesCount).toBeInTheDocument();
  });

  it('should call a function to like a comment when the up arrow wrapper is clicked', async () => {
    const { user, likeFn } = renderCommentLikes(superUser);

    const likeCommentDiv = screen.getByTitle('Like Comment');
    await user.click(likeCommentDiv);

    expect(likeFn).toHaveBeenCalledTimes(1);
  });

  it('should call a function to dislike a comment when the down arrow wrapper is clicked', async () => {
    const { user, dislikeFn } = renderCommentLikes(superUser);

    const dislikeCommentDiv = screen.getByTitle(/dislike comment/i);
    await user.click(dislikeCommentDiv);

    expect(dislikeFn).toHaveBeenCalledTimes(1);
  });

  it('should render an up arrow without the liked class if the comment is not liked by the user', async () => {
    renderCommentLikes(superUser);

    const upArrow = screen.getByTestId('up-arrow');

    expect(upArrow).not.toHaveClass(/liked/i);
  });

  it('should render a down arrow without the disliked class if the comment is not disliked by the user', async () => {
    renderCommentLikes(user1);

    const downArrow = screen.getByTestId('down-arrow');

    expect(downArrow).not.toHaveClass(/disliked/i);
  });

  it('should render an up arrow with the liked class if the comment is liked by the user', async () => {
    renderCommentLikes(user1);

    const upArrow = screen.getByTestId('up-arrow');

    expect(upArrow).toHaveClass(/liked/i);
  });

  it('should render a down arrow with the disliked class if the comment is disliked by the user', async () => {
    renderCommentLikes(superUser);

    const downArrow = screen.getByTestId('down-arrow');

    expect(downArrow).toHaveClass(/disliked/i);
  });
});
