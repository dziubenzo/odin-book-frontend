/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';

import PostDetailsPage from '../pages/PostDetailsPage';
import PostDetails from '../components/PostDetails';
import CommentInput from '../components/CommentInput';
import CommentInputBottom from '../components/CommentInputBottom';
import Comments from '../components/Comments';
import CommentBody from '../components/CommentBody';
import CommentLikes from '../components/CommentLikes';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import { mockFetch } from './fetchMock';
import { detailedPost1, superUser, longComment, user1 } from './mocks';
import { MAX_COMMENT_LENGTH } from '../helpers';

const navigateFn = vi.fn();

const { comments } = detailedPost1;

function renderPostDetailsPage() {
  // Mock useOutletContext, useParams and useNavigate hooks
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useParams: () => {
        return {
          slug: `${detailedPost1.slug}`,
        };
      },
      useOutletContext: () => {
        return {
          user: superUser,
        };
      },
      useNavigate: () => navigateFn,
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

function renderPostDetails() {
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <PostDetails
          post={detailedPost1}
          user={superUser}
          handlePostLikeClick={vi.fn()}
          handlePostDislikeClick={vi.fn()}
        />
      </Theme>
    </BrowserRouter>,
  );

  return { user, navigateFn };
}

function renderCommentInput() {
  const setPostMock = vi.fn();
  const user = userEvent.setup();

  render(
    <Theme>
      <CommentInput
        user={superUser}
        post={detailedPost1}
        setPost={setPostMock}
      />
    </Theme>,
  );

  return { user };
}

function renderCommentInputBottom(
  handleSubmitCommentClick,
  inProgress = false,
  isSubmitted = false,
  commentError = '',
) {
  render(
    <Theme>
      <CommentInputBottom
        handleSubmitCommentClick={handleSubmitCommentClick}
        inProgress={inProgress}
        isSubmitted={isSubmitted}
        commentError={commentError}
      />
    </Theme>,
  );
}

function renderComments() {
  const likeCommentFn = vi.fn();
  const dislikeCommentFn = vi.fn();
  const user = userEvent.setup();

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

describe('PostDetailsPage', () => {
  it('should render a loading message immediately after rendering', () => {
    mockFetch('Failed to fetch', false);
    renderPostDetailsPage();

    const loadingMessage = screen.getByRole('heading', {
      name: /loading post/i,
    });

    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render an error message if fetching the post fails', async () => {
    mockFetch('Failed to fetch', false);
    renderPostDetailsPage();

    const errorMessage = await screen.findByText(/failed to fetch/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should render a Post Details section', async () => {
    mockFetch(detailedPost1, true);
    renderPostDetailsPage();

    const postTitle = await screen.findByRole('heading', {
      name: /post 1 detailed/i,
    });
    const postContent = await screen.findByText(/detailed content/i);

    expect(postTitle).toBeInTheDocument();
    expect(postContent).toBeInTheDocument();
  });

  it('should render a New Comment section with a Submit button', async () => {
    mockFetch(detailedPost1, true);
    renderPostDetailsPage();

    const newCommentHeading = await screen.findByRole('heading', {
      name: /new comment/i,
    });
    const submitButton = await screen.findByRole('button');

    expect(newCommentHeading).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should render a Comments section with all comments', async () => {
    mockFetch(detailedPost1, true);
    renderPostDetailsPage();

    const commentsHeading = await screen.findByRole('heading', {
      name: /comments/i,
    });
    const allComments = await screen.findAllByText(/comment content/i);

    expect(commentsHeading).toBeInTheDocument();
    expect(allComments).toHaveLength(detailedPost1.comments.length);
  });
});

describe('PostDetails', () => {
  test("clicking the return icon should call a useNavigate hook function with the '/posts' argument", async () => {
    const { user, navigateFn } = renderPostDetails();

    const returnIconDiv = screen.getByTestId('return-icon');
    await user.click(returnIconDiv);

    expect(navigateFn).toHaveBeenCalledTimes(1);
    expect(navigateFn).toHaveBeenCalledWith('/posts');
  });
});

describe('CommentInputTop', () => {
  it('should render an empty comment input field', () => {
    renderCommentInput();

    const commentInputField = screen.getByTestId('comment-input-field');

    expect(commentInputField.textContent).toBe('');
  });

  it('should render a comment input field that accepts input', async () => {
    const { user } = renderCommentInput();
    const typedText = 'I should accept input, yay!';

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, typedText);

    expect(commentInputField.textContent).toBe(typedText);
  });

  it('should render a comment length paragraph', () => {
    renderCommentInput();

    const commentLengthPara = screen.getByText(new RegExp(MAX_COMMENT_LENGTH));

    expect(commentLengthPara).toBeInTheDocument();
  });

  it('should render a comment length paragraph that changes depending on the comment input field length', async () => {
    const { user } = renderCommentInput();
    const typedText = 'Text!';

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, typedText);
    const commentLengthPara = screen.getByText(
      new RegExp(MAX_COMMENT_LENGTH - typedText.length),
    );

    expect(commentLengthPara).toBeInTheDocument();
  });

  it('should render a comment length paragraph that cannot exceed MAX_COMMENT_LENGTH', async () => {
    const { user } = renderCommentInput();

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, longComment + 'I will now be too long');
    const commentLengthPara = screen.getByText(/0/i);

    expect(commentLengthPara).toBeInTheDocument();
    expect(commentInputField.textContent.length).toBe(MAX_COMMENT_LENGTH);
  });

  it('should render a comment length paragraph that has a different colour if the comment length is smaller than MIN_COMMENT_LENGTH', async () => {
    const { user } = renderCommentInput();
    const typedText = 'Oi';

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, typedText);
    const commentLengthPara = screen.getByText(
      new RegExp(MAX_COMMENT_LENGTH - typedText.length),
    );

    expect(commentLengthPara).toHaveClass('warning');
  });

  it('should render a comment length paragraph that has a different colour if the comment length is close to MAX_COMMENT_LENGTH', async () => {
    const { user } = renderCommentInput();

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, longComment);
    const commentLengthPara = screen.getByText(
      new RegExp(MAX_COMMENT_LENGTH - longComment.length),
    );

    expect(commentLengthPara).toHaveClass('warning');
  });

  it('should render a comment length paragraph that has a normal colour otherwise', async () => {
    const { user } = renderCommentInput();
    const typedText = 'I am a legit comment, trust me!';

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, typedText);
    const commentLengthPara = screen.getByText(
      new RegExp(MAX_COMMENT_LENGTH - typedText.length),
    );

    expect(commentLengthPara).not.toHaveClass('warning');
  });
});

describe('CommentInputBottom', () => {
  it('should render a Submit button', () => {
    renderCommentInput();

    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeInTheDocument();
  });

  it('should call a function to create a new comment if the Submit button is clicked', async () => {
    const createCommentFn = vi.fn();
    const user = userEvent.setup();
    renderCommentInputBottom(createCommentFn);

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(createCommentFn).toHaveBeenCalledTimes(1);
  });

  it("should change the description of the Submit button to 'Submitting...' if a new comment is being created", () => {
    renderCommentInputBottom(vi.fn(), true);

    const submitButton = screen.getByRole('button');

    expect(submitButton.textContent).toBe('Submitting...');
  });

  it("should change the description of the Submit button to 'Submitted!' if a new comment has just been created", () => {
    renderCommentInputBottom(vi.fn(), false, true);

    const submitButton = screen.getByRole('button');

    expect(submitButton.textContent).toBe('Submitted!');
  });

  it('should render an error message if the comment has not been created', () => {
    const errorMessage = 'A massive failure!';
    renderCommentInputBottom(vi.fn(), false, false, errorMessage);

    const errorMessageParagraph = screen.getByText(errorMessage);

    expect(errorMessageParagraph).toBeInTheDocument();
  });
});

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
