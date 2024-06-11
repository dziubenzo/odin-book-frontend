/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import CommentInput from '../components/CommentInput';
import CommentInputBottom from '../components/CommentInputBottom';
import Theme from '../components/Theme';

import { detailedPost1, superUser, longComment } from './mocks';
import { MAX_COMMENT_LENGTH } from '../helpers';

function renderComponent() {
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

describe('CommentInputTop', () => {
  it('should render an empty comment input field', () => {
    renderComponent();

    const commentInputField = screen.getByTestId('comment-input-field');

    expect(commentInputField.textContent).toBe('');
  });

  it('should render a comment input field that accepts input', async () => {
    const { user } = renderComponent();
    const typedText = 'I should accept input, yay!';

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, typedText);

    expect(commentInputField.textContent).toBe(typedText);
  });

  it('should render a comment length paragraph', () => {
    renderComponent();

    const commentLengthPara = screen.getByText(new RegExp(MAX_COMMENT_LENGTH));

    expect(commentLengthPara).toBeInTheDocument();
  });

  it('should render a comment length paragraph that changes depending on the comment input field length', async () => {
    const { user } = renderComponent();
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
    const { user } = renderComponent();

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, longComment + 'I will now be too long');
    const commentLengthPara = screen.getByText(/0/i);

    expect(commentLengthPara).toBeInTheDocument();
    expect(commentInputField.textContent.length).toBe(MAX_COMMENT_LENGTH);
  });

  it('should render a comment length paragraph that has a different colour if the comment length is smaller than MIN_COMMENT_LENGTH', async () => {
    const { user } = renderComponent();
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
    const { user } = renderComponent();

    const commentInputField = screen.getByTestId('comment-input-field');
    await user.click(commentInputField);
    await user.type(commentInputField, longComment);
    const commentLengthPara = screen.getByText(
      new RegExp(MAX_COMMENT_LENGTH - longComment.length),
    );

    expect(commentLengthPara).toHaveClass('warning');
  });

  it('should render a comment length paragraph that has a normal colour otherwise', async () => {
    const { user } = renderComponent();
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

describe('CommentInputTop', () => {
  it('should render a Submit button', () => {
    renderComponent();

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
