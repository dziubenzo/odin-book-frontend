/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import WelcomePage from '../pages/WelcomePage';

test('Log In and Sign Up buttons should be visible', () => {
  render(<WelcomePage />);

  const logInButton = screen.getByRole('button', { name: /log in/i });
  const signUpButton = screen.getByRole('button', { name: /sign up/i });

  expect(logInButton).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});

test('clicking on the Log In button should call a function that opens the Log In modal', async () => {
  const user = userEvent.setup();
  HTMLDialogElement.prototype.showModal = vi.fn();
  render(<WelcomePage />);

  const logInButton = screen.getByRole('button', { name: /log in/i });

  await user.click(logInButton);

  expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
});

test('clicking on the Sign Up button should call a function that opens the Sign Up modal', async () => {
  const user = userEvent.setup();
  HTMLDialogElement.prototype.showModal = vi.fn();
  render(<WelcomePage />);

  const signUpButton = screen.getByRole('button', { name: /sign up/i });

  await user.click(signUpButton);

  expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
});
