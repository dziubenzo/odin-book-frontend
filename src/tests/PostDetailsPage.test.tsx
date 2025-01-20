import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'vitest';
import CommentBody from '../components/CommentBody';
import CommentInput from '../components/CommentInput';
import CommentInputBottom from '../components/CommentInputBottom';
import CommentLikes from '../components/CommentLikes';
import Comments from '../components/Comments';
import Theme from '../components/Theme';
import { MAX_COMMENT_LENGTH } from '../constants';
import PostDetailsPage from '../pages/PostDetailsPage';
import type { User } from '../types';
import { mockFetch } from './fetchMock';
import { mockUseUserAndTheme } from './hookMocks';
import { detailedPost1, longComment, superUser, user1 } from './mocks';

const navigateFn = vi.fn();

const { comments } = detailedPost1;

function renderPostDetailsPage() {
  // Mock useParams and useNavigate hooks
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = (await importOriginal()) as object;
    return {
      ...actual,
      useParams: () => {
        return {
          slug: `${detailedPost1.slug}`,
        };
      },
      useNavigate: () => navigateFn,
    };
  });
  mockUseUserAndTheme(superUser);
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <PostDetailsPage />
      </Theme>
    </BrowserRouter>,
  );

  return user;
}

function renderCommentInput() {
  const setPostMock = vi.fn();
  mockUseUserAndTheme(superUser);
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <Theme>
        <CommentInput post={detailedPost1} setPost={setPostMock} />
      </Theme>
    </BrowserRouter>,
  );

  return { user };
}

function renderCommentInputBottom(
  handleSubmitCommentClick: () => Promise<void>,
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
          inProgress={false}
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

function renderCommentLikes(loggedInUser: User) {
  const firstComment = comments[0];
  const likeFn = vi.fn();
  const dislikeFn = vi.fn();
  mockUseUserAndTheme(loggedInUser);
  const user = userEvent.setup();

  render(
    <Theme>
      <CommentLikes
        comment={firstComment}
        handleCommentLikeClick={likeFn}
        handleCommentDislikeClick={dislikeFn}
        inProgress={false}
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
    const submitButton = screen.getByRole('button', { name: /submit/i });

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

  it('should render a return icon', async () => {
    mockFetch(detailedPost1, true);
    renderPostDetailsPage();

    const returnIcon = await screen.findByRole('button', {
      name: /back to previous page/i,
    });

    expect(returnIcon).toBeInTheDocument();
  });

  it('should render a return icon that calls a useNavigate function hook with -1 argument if clicked', async () => {
    mockFetch(detailedPost1, true);
    const user = renderPostDetailsPage();

    const returnIcon = await screen.findByRole('button', {
      name: /back to previous page/i,
    });
    await user.click(returnIcon);

    expect(navigateFn).toHaveBeenCalled();
    expect(navigateFn).toHaveBeenCalledWith(-1);
  });
});

describe('CommentInputTop', () => {
  it('should render an empty comment input field', () => {
    renderCommentInput();

    const commentTextArea = screen.getByRole<HTMLTextAreaElement>('textbox');

    expect(commentTextArea).toHaveValue('');
  });

  it('should render a comment input field that accepts input', async () => {
    const { user } = renderCommentInput();
    const typedText = 'I should accept input, yay!';

    const commentTextArea = screen.getByRole<HTMLTextAreaElement>('textbox');
    await user.click(commentTextArea);
    await user.type(commentTextArea, typedText);

    expect(commentTextArea).toHaveValue(typedText);
  });

  it('should render a comment length paragraph', () => {
    renderCommentInput();

    const commentLengthPara = screen.getByText(MAX_COMMENT_LENGTH);

    expect(commentLengthPara).toBeInTheDocument();
  });

  it('should render a comment length paragraph that changes depending on the comment input field length', async () => {
    const { user } = renderCommentInput();
    const typedText = 'Text!';

    const commentTextArea = screen.getByRole<HTMLTextAreaElement>('textbox');
    await user.click(commentTextArea);
    await user.type(commentTextArea, typedText);
    const commentLengthPara = screen.getByText(
      MAX_COMMENT_LENGTH - typedText.length,
    );

    expect(commentLengthPara).toBeInTheDocument();
  });

  it('should render a comment length paragraph that does not include new lines as characters', async () => {
    const { user } = renderCommentInput();
    const typedText = 'Text';
    const typedTextWithNewLines = `\n${typedText}\n`;

    const commentTextArea = screen.getByRole<HTMLTextAreaElement>('textbox');
    await user.click(commentTextArea);
    await user.type(commentTextArea, typedTextWithNewLines);
    const commentLengthPara = screen.getByText(
      MAX_COMMENT_LENGTH - typedText.length,
    );

    expect(commentLengthPara).toBeInTheDocument();
  });

  it('should render a comment length paragraph that cannot exceed MAX_COMMENT_LENGTH', async () => {
    const { user } = renderCommentInput();

    const commentTextArea = screen.getByRole<HTMLTextAreaElement>('textbox');
    await user.click(commentTextArea);
    await user.type(commentTextArea, longComment + 'I will now be too long');
    const commentLengthPara = screen.getByText(/0/i);

    expect(commentLengthPara).toBeInTheDocument();
    expect(commentTextArea.value.length).toBe(MAX_COMMENT_LENGTH);
  });

  it('should render a comment length paragraph that has a different colour if the comment length is smaller than MIN_COMMENT_LENGTH', async () => {
    const { user } = renderCommentInput();
    const typedText = 'Oi';

    const commentTextArea = screen.getByRole<HTMLTextAreaElement>('textbox');
    await user.click(commentTextArea);
    await user.type(commentTextArea, typedText);
    const commentLengthPara = screen.getByText(
      MAX_COMMENT_LENGTH - typedText.length,
    );

    expect(commentLengthPara).toHaveClass('warning');
  });

  it('should render a comment length paragraph that has a different colour if the comment length is close to MAX_COMMENT_LENGTH', async () => {
    const { user } = renderCommentInput();

    const commentTextArea = screen.getByRole<HTMLTextAreaElement>('textbox');
    await user.click(commentTextArea);
    await user.type(commentTextArea, longComment);
    const commentLengthPara = screen.getByText(
      MAX_COMMENT_LENGTH - longComment.length,
    );

    expect(commentLengthPara).toHaveClass('warning');
  });

  it('should render a comment length paragraph that has a normal colour otherwise', async () => {
    const { user } = renderCommentInput();
    const typedText = 'I am a legit comment, trust me!';

    const commentTextArea = screen.getByRole<HTMLTextAreaElement>('textbox');
    await user.click(commentTextArea);
    await user.type(commentTextArea, typedText);
    const commentLengthPara = screen.getByText(
      MAX_COMMENT_LENGTH - typedText.length,
    );

    expect(commentLengthPara).not.toHaveClass('warning');
  });
});

describe('CommentInputBottom', () => {
  it('should render a Submit button', () => {
    renderCommentInput();

    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(submitButton).toBeInTheDocument();
  });

  it('should call a function to create a new comment if the Submit button is clicked', async () => {
    const createCommentFn = vi.fn();
    const user = userEvent.setup();
    renderCommentInputBottom(createCommentFn);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(createCommentFn).toHaveBeenCalledTimes(1);
  });

  it("should change the description of the Submit button to 'Submitting...' if a new comment is being created", () => {
    renderCommentInputBottom(vi.fn(), true);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(submitButton.textContent).toBe('Submitting...');
  });

  it("should change the description of the Submit button to 'Submitted!' if a new comment has just been created", () => {
    renderCommentInputBottom(vi.fn(), false, true);

    const submitButton = screen.getByRole('button', { name: /submit/i });

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
  it('should render a correct likes count', () => {
    const { firstComment } = renderCommentLikes(superUser);

    const likesCount = screen.getByText(
      firstComment.likes.length - firstComment.dislikes.length,
    );

    expect(likesCount).toBeInTheDocument();
  });

  it('should call a function to like a comment when the up arrow icon is clicked', async () => {
    const { user, likeFn } = renderCommentLikes(superUser);

    const likeCommentIcon = screen.getByRole('button', {
      name: 'Like Comment Icon',
    });
    await user.click(likeCommentIcon);

    expect(likeFn).toHaveBeenCalledTimes(1);
  });

  it('should call a function to dislike a comment when the down arrow wrapper is clicked', async () => {
    const { user, dislikeFn } = renderCommentLikes(superUser);

    const dislikeCommentIcon = screen.getByRole('button', {
      name: /dislike comment icon/i,
    });
    await user.click(dislikeCommentIcon);

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
