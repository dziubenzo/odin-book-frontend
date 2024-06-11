/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import PostDetails from '../components/PostDetails';
import Theme from '../components/Theme';
import { BrowserRouter } from 'react-router-dom';

import { detailedPost1, superUser } from './mocks';

const navigateFn = vi.fn();

function renderComponent() {
  const user = userEvent.setup();

  // Mock useNavigate
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: () => navigateFn,
    };
  });

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

test("clicking the return icon should call a useNavigate hook function with the '/posts' argument", async () => {
  const { user, navigateFn } = renderComponent();

  const returnIconDiv = screen.getByTestId('return-icon');
  await user.click(returnIconDiv);

  expect(navigateFn).toHaveBeenCalledTimes(1);
  expect(navigateFn).toHaveBeenCalledWith('/posts');
});
