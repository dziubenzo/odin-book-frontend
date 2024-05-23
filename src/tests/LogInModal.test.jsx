/* eslint-disable no-undef */

import { expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { mockFetch } from './fetchMock';

import Theme from '../components/Theme';
import LoginModal from '../components/LoginModal';

function renderComponent() {
  const user = userEvent.setup();
  const mockRef = {
    current: document.createElement('dialog'),
  };
  HTMLDialogElement.prototype.close = vi.fn();
  render(
    <BrowserRouter>
      <Theme>
        <LoginModal
          loginModalRef={mockRef}
          setUsername={vi.fn()}
          setPassword={vi.fn()}
        />
      </Theme>
    </BrowserRouter>,
  );
  return user;
}

test('clicking on the close modal icon should call a function that closes the Log In modal', async () => {
  const user = renderComponent();

  const closeIcon = screen.getByTitle('Close');
  await user.click(closeIcon);

  expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
});

test('clicking outside the modal should call a function that closes the Log In modal', async () => {
  const user = renderComponent();

  // Modal is hidden by default, hence hidden: true
  const modal = screen.getByRole('dialog', { hidden: true });
  await user.click(modal);

  expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
});

test('Username field should accept input', async () => {
  const user = renderComponent();

  const usernameField = screen.getByLabelText(/username/i);
  await user.click(usernameField);
  await user.keyboard('myusername');

  expect(usernameField.value).toBe('myusername');
});

test('Password field should accept input', async () => {
  const user = renderComponent();

  const passwordField = screen.getByLabelText(/password/i);
  await user.click(passwordField);
  await user.keyboard('mypassword');

  expect(passwordField.value).toBe('mypassword');
});

test('Log In button should be visible on render', () => {
  renderComponent();

  const logInButton = screen.getByRole('button', { hidden: true });

  expect(logInButton).not.toHaveStyle({ visibility: 'hidden' });
});

test('Log In button should not submit the form if the form is not filled out', async () => {
  const user = renderComponent();
  const fetchMock = mockFetch('I should not be called!', false);

  const logInButton = screen.getByRole('button', { hidden: true });
  await user.click(logInButton);

  expect(fetchMock).not.toHaveBeenCalled();
})

test('an error message should be shown and the Log In button should be invisible on form submission with incorrect credentials', async () => {
  const user = renderComponent();
  const fetchMock = mockFetch('invalid username', false);

  const usernameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  usernameField.value = 'myusername';
  passwordField.value = 'mypassword';

  const logInButton = screen.getByRole('button', { hidden: true });
  await user.click(logInButton);
  const errorMessage = await screen.findByText(/invalid username/i);

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(logInButton).toHaveStyle({ visibility: 'hidden' });
  expect(errorMessage).toBeInTheDocument();
});
