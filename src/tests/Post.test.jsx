/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import PostLikes from '../components/PostLikes';
import PostBody from '../components/PostBody';
import Theme from '../components/Theme';

import { post1, superUser, user1 } from './mocks';

function renderPostLikes(loggedInUser) {
  const likeFn = vi.fn();
  const dislikeFn = vi.fn();
  const user = userEvent.setup();

  render(
    <Theme>
      <PostLikes
        post={post1}
        user={loggedInUser}
        handleLikeClick={likeFn}
        handleDislikeClick={dislikeFn}
      />
    </Theme>,
  );

  return { likeFn, dislikeFn, user };
}

describe('PostLikes', () => {
  it('should show likes count', () => {
    renderPostLikes(superUser);

    const likesCount = screen.getByTestId('likes-count');

    expect(likesCount).toBeInTheDocument();
  });

  it('should show correct likes count', () => {
    const likes = post1.likes.length;
    const dislikes = post1.dislikes.length;
    renderPostLikes(superUser);

    const likesCount = screen.getByTestId('likes-count');

    expect(likesCount.textContent).toBe((likes - dislikes).toString());
  });

  it('should call a function to like a post when the up arrow wrapper is clicked', async () => {
    const { user, likeFn } = renderPostLikes(superUser);

    const likePostDiv = screen.getByTitle('Like Post');
    await user.click(likePostDiv);

    expect(likeFn).toHaveBeenCalledTimes(1);
  });

  it('should call a function to dislike a post when the down arrow wrapper is clicked', async () => {
    const { user, dislikeFn } = renderPostLikes(superUser);

    const dislikePostDiv = screen.getByTitle(/dislike post/i);
    await user.click(dislikePostDiv);

    expect(dislikeFn).toHaveBeenCalledTimes(1);
  });

  it('should render an up arrow without the liked class if the post is not liked by the user', async () => {
    renderPostLikes(superUser);

    const upArrow = screen.getByTestId('up-arrow');

    expect(upArrow).not.toHaveClass(/liked/i);
  });

  it('should render a down arrow without the disliked class if the post is not disliked by the user', async () => {
    renderPostLikes(superUser);

    const downArrow = screen.getByTestId('down-arrow');

    expect(downArrow).not.toHaveClass(/disliked/i);
  });

  it('should render an up arrow with the liked class if the post is liked by the user', async () => {
    renderPostLikes(user1);

    const upArrow = screen.getByTestId('up-arrow');

    expect(upArrow).toHaveClass(/liked/i);
  });

  it('should render a down arrow with the disliked class if the post is disliked by the user', async () => {
    renderPostLikes(user1);

    const downArrow = screen.getByTestId('down-arrow');

    expect(downArrow).toHaveClass(/disliked/i);
  });
});
