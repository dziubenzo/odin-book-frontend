/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import CommentInput from '../components/CommentInput';
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
